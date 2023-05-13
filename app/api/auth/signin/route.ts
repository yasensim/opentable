import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();


export async function GET(request: Request, response: Response) {
  return new Response(JSON.stringify({meassage: "My SignUP implementation!"}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}

export async function POST(request: Request) {
    const errors: string[] = [];
    const { email, password } = await request.json();


  // Validation would be much better on the client side, but we'll do it here for now
    const validationSchema = [
        {
            valid: validator.isEmail(email),
            message: 'Email address is invalid',
        },
        {
            valid: validator.isLength(password, { min: 3 }),
            message: 'Password must be at least 3 characters',
        },
    ];

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return new Response(JSON.stringify('Error: Email not registred '), {status: 401});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return new Response(JSON.stringify('Error: Invalid credentials'), {status: 401});
    }   

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email: email})
    .setProtectedHeader({alg})
    .setExpirationTime('24h')
    .sign(secret);


    try {
      return new Response(JSON.stringify({user: user, token: token}), {status: 200});
    } catch (error) {
      console.error('DynamoDB error:', error);
      return new Response('Failed to submit email', {status: 500});
    } 
}
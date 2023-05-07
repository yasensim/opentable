import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
  return new Response(JSON.stringify({meassage: "My SignUP implementation!"}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}

export async function POST(request: Request) {

  //const { email, password } = await request.json();
  const body = await request.json();
  console.log(body);

  // Validation would be much better on the client side, but we'll do it here for now
  const validationSchema = [
    {
      valid: validator.isEmail(body.email),
      message: 'Email address is invalid',
    },
    {
      valid: validator.isLength(body.password, { min: 3 }),
      message: 'Password must be at least 3 characters',
    },
    {
      valid: validator.isLength(body.firstName, { min: 3, max:20, }),
      message: 'FirstName must be at least 3 characters',
    },
    {
      valid: validator.isLength(body.lastName, { min: 3, max:20, }),
      message: 'FirstName must be at least 3 characters',
    },
    {
      valid: validator.isMobilePhone(body.phoneNumber, 'any'),
      message: 'Mobile phone number is not valid',
    },
    {
      valid: validator.isLength(body.city, { min: 3, max:20, }),
      message: 'City must be at least 3 characters',
    },
    {
      valid: validator.isStrongPassword(body.password, { minLength: 3, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }),
      message: 'Password must be at least 3 characters, contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
    },
    ];

  let invalidItemMessage = null;

  for (const item of validationSchema) {
    console.log(item);
    if (item.valid === false) {
      console.log("internal: " + item.message);
      invalidItemMessage = item.message;
      break;
    }
  }

  if (invalidItemMessage) {
    return new Response(invalidItemMessage, { status: 400 });
  }

const user = await prisma.user.findUnique({
  where: {
    email: body.email,
  },
});

if(user) {
  return new Response('Email already exists', {status: 400});
}

const hashedPassword = await bcrypt.hash(body.password, 10);

const newUser = await prisma.user.create({
  data: {
    email: body.email,
    password: hashedPassword,
    first_name: body.firstName,
    last_name: body.lastName,
    phone: body.phoneNumber,
    city: body.city,
  },
});

const alg = 'HS256';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const token = await new jose.SignJWT({ email: newUser.email})
  .setProtectedHeader({alg})
  .setExpirationTime('24h')
  .sign(secret);


    try {
      console.log(body.email);  
      return new Response(JSON.stringify({user: newUser, token: token}), {status: 200});
    } catch (error) {
      console.error('DynamoDB error:', error);
      return new Response('Failed to submit email', {status: 500});
    } 

}
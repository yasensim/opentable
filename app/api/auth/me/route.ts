import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export async function GET(request: Request) {

    const bearer = request.headers.get('Authorization') as string;
    const token = bearer.split(' ')[1];
    const payload = jwt.decode(token) as {email: string};
    

    if(!payload) return new Response(JSON.stringify({meassage: "Unauthorized request!"}),  {status: 401, headers: {'Content-Type': 'application/json'}})

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            email: true,
            first_name: true,
            created_at: true,
            updated_at: true,
        }
    });

    return new Response(JSON.stringify({meassage: user}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}

export async function POST(request: Request) {

    return new Response(JSON.stringify({meassage: "My SignUP implementation!"}),  {status: 200, headers: {'Content-Type': 'application/json'}})
}
import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest, res: NextResponse){
    console.log("middleware");
    const bearer = req.headers.get('Authorization') as string;
    if(!bearer) return new Response(JSON.stringify({meassage: "Unauthorized request!"}),  {status: 401, headers: {'Content-Type': 'application/json'}})
    const token = bearer.split(' ')[1];
    if(!token) return new Response(JSON.stringify({meassage: "Unauthorized request!"}),  {status: 401, headers: {'Content-Type': 'application/json'}})

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        const { payload } = await jose.jwtVerify(token, secret);
    } catch (error) {
        return new Response(JSON.stringify({meassage: "Unauthorized request!"}),  {status: 401, headers: {'Content-Type': 'application/json'}})
    }
}

export const config = {
    matcher: ["/api/auth/signout", "/api/auth/me"]
};

import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import { db } from "@/lib/db";

const MAX_AGE = 60 * 60 * 24 * 30;         // 30 days

export async function POST(
    req: Request,
) {
    try {
        const { email, password } = await req.json();

        // Check if the email is already exist
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            },
            include: {
                scanningPoint: true
            }
        });

        if (!existingUserByEmail) {
            return new NextResponse("Email does not exist!", { status: 409 });
        };

        // Check the password is correct
        const passwordMatch = await compare(password, existingUserByEmail.password);

        if (!passwordMatch) {
            return new NextResponse("Password does not match!", { status: 401 });
        }
        
        // Get the secret
        const secret = process.env.JWT_SECRET || "";

        // Sign the token
        const token = sign(
            { 
                user: {
                    email, 
                    role: existingUserByEmail.role,
                    name: existingUserByEmail.name,
                },
                scanningPoint: {
                    pointNo: existingUserByEmail.scanningPoint?.pointNo,
                    name: existingUserByEmail.scanningPoint?.name,
                    route: existingUserByEmail.scanningPoint?.route
                }
            },
            secret,
            { expiresIn: MAX_AGE },
        );

        // Serialize the token to cookie
        const serialized = serialize("ELIOT_AUTH", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/",
        });

        const response = {
            role: existingUserByEmail.role,
            pointName: existingUserByEmail.scanningPoint?.name,
            route: existingUserByEmail.scanningPoint?.route
        }

        return NextResponse.json(
            { data: response, message: 'Successfully authenticated!'}, 
            { status: 201, headers: { "Set-Cookie": serialized } }
        );
        
    } catch (error) {
        console.error("[SIGNIN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
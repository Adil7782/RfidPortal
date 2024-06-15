import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";

export async function POST(
    req: Request,
) {
    try {
        const { name, phone, email, password, employeeId, role, unit, lineId, scanningPointId } = await req.json();

        const id = generateUniqueId();

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            }
        });

        const existingUserByEmpId = await db.user.findUnique({
            where: {
                employeeId
            }
        });

        if (existingUserByEmail || existingUserByEmpId) {
            return new NextResponse("User already registered", { status: 409 })
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = await db.user.create({
            data: {
                id,
                name,
                role,
                employeeId,
                email,
                phone,
                password: hashedPassword,
                unit: unit || null,
                scanningPointId: scanningPointId || null,
                lineId: lineId || null,
            }
        });

        // remove the password from the response
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'User account created successfully'}, { status: 201 });
    } catch (error) {
        console.error("[USER_REGISTRATION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
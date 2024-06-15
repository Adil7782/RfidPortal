import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";

export async function POST(
    req: Request,
) {
    try {
        const { pointNo, name, section } = await req.json();
        const id = generateUniqueId();

        const existingPoint = await db.scanningPoint.findUnique({
            where: {
                pointNo: pointNo.toString()
            }
        });

        if (existingPoint) {
            return new NextResponse(`Point ${pointNo} is already exist!`, { status: 409 })
        }

        const newPoint = await db.scanningPoint.create({
            data: {
                id,
                pointNo: pointNo.toString(),
                name,
                section 
            }
        });

        return NextResponse.json({ data: newPoint, message: 'Scanning point is created successfully!'}, { status: 201 });
        
    } catch (error) {
        console.error("[SCANNING_POINT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
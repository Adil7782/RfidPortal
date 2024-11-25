import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";

export async function POST(
    req: Request,
) {
    try {
        const { name, qcPointNo } = await req.json();

        const existingLine = await db.defect.findFirst({
            where: {
                name
            }
        });

        if (existingLine) {
            return new NextResponse("Defect is already exist, please use different one!", { status: 409 })
        }

        const newLine = await db.defect.create({
            data: {
                id: generateUniqueId(),
                name,
                qcPointNo: parseInt(qcPointNo) 
            }
        });

        return NextResponse.json({ data: newLine, message: 'QC defect is created successfully!'}, { status: 201 });
        
    } catch (error) {
        console.error("[CREATE_QC_DEFECT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

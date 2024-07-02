import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";

export async function GET(
    req: Request
) {
    const url = new URL(req.url);
    const unit = url.searchParams.get('unit');
    
    try {
        if (unit) {
            const lines = await db.productionLine.findMany({
                where: {
                    unit,
                },
            });
    
            return NextResponse.json({ data: lines, message: 'Production lines fetched successfully!' }, { status: 200 });
        }
    } catch (error) {
        console.error("[FETCH_PRODUCTION_LINES_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
) {
    try {
        const { name, unit } = await req.json();
        const id = generateUniqueId();

        const existingLine = await db.productionLine.findUnique({
            where: {
                name
            }
        });

        if (existingLine) {
            return new NextResponse("Line name is already exist, please use different one!", { status: 409 })
        }

        const newLine = await db.productionLine.create({
            data: {
                id,
                name,
                unit 
            }
        });

        return NextResponse.json({ data: newLine, message: 'Production line is created successfully!'}, { status: 201 });
        
    } catch (error) {
        console.error("[PRODUCTION_LINE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
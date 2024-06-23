import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { productId, qcSectionId, qcStatus, defects } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!productId || !qcSectionId || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const newProductDefect = await db.productDefect.create({
            data: {
                id: generateUniqueId(),
                productId,
                qcSectionId,
                qcStatus,
                timestamp,
                defects: {
                    connect: defects.map((defectId: string) => ({ id: defectId }))
                }
            }
        });

        return NextResponse.json({ data: newProductDefect, message: 'Product defects recorded successfully'}, { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        6: 'timestampAssembleQc',
        7: 'timestampButtonQc',
        10: 'timestampDryQc',
        11: 'timestampWetQc',
        15: 'timestampFinishLineQc'
    };
    return timestampFields[pointNo];
}

export async function POST(
    req: Request,
) {
    const { pointNo, productId, qcSectionId, qcStatus, defects } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!pointNo || !productId || !qcSectionId || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const timestampField = getTimestampField(pointNo);

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid QC point number", { status: 400 });
        }

        await db.product.update({
            where: {
                id: productId
            },
            data: {
                currentPointNo: pointNo,
                [timestampField]: timestamp
            }
        })

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
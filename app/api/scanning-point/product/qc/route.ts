import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        8: 'timestampAssembleQc',
        9: 'timestampButtonQc',
        12: 'timestampDryQc',
        13: 'timestampWetQc',
        17: 'timestampFinishLineQc'
    };
    return timestampFields[pointNo];
}

export async function POST(
    req: Request,
) {
    const { pointNo, productId, qcPointId, qcStatus, defects } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!pointNo || !productId || !qcPointId || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Dynamically find the timestamp field
        const timestampField = getTimestampField(pointNo);

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid QC point number", { status: 400 });
        }

        // Check the product is passed the previous section
        const productCount = await db.product.count({
            where: {
                id: productId,
                currentPointNo: pointNo - 1,
            }
        });

        if (productCount === 0) {
            return new NextResponse(`Product not is not passed the section:${pointNo - 1}`, { status: 409 });
        }

        // Update the product's current point number and timestamp
        await db.product.update({
            where: {
                id: productId
            },
            data: {
                currentPointNo: pointNo,
                [timestampField]: timestamp
            }
        })

        // Create a new product defect record
        // const newProductDefect = await db.productDefect.create({
        //     data: {
        //         id: generateUniqueId(),
        //         productId,
        //         qcPointId,
        //         qcStatus,
        //         timestamp,
        //         defects: {
        //             connect: defects.map((defectId: string) => ({ id: defectId }))
        //         }
        //     }
        // });

        // return NextResponse.json({ data: newProductDefect, message: 'Product defects recorded successfully'}, { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    const { productId, line, pointNo } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!productId || !line || !pointNo) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const product = await db.product.findUnique({
            where: {
                id: productId,
            }
        });

        if (!product) {
            return new NextResponse(`Product not is not exist in database.`, { status: 409 });
        };

        if (product.currentPointNo === pointNo - 1) {
            return new NextResponse(`Product not is not passed the last scanning point`, { status: 409 });
        };

        if (product.timestampFinishLineIn || product.finishingLine) {
            return new NextResponse("Garment is already updated", { status: 409 });
        };

        await db.product.update({
            where: {
                id: productId
            },
            data: {
                currentPointNo: pointNo,
                timestampFinishLineIn: timestamp
            }
        });

        return new NextResponse("Updated product successfully", { status: 200 });
    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    const { pointNo, rfidTag } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!pointNo || !rfidTag) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Check if the product updated already for this point
        const alreadyUpdated = await db.product.findMany({
            where: {
                rfid: {
                    rfid: rfidTag,
                    isActive: true
                },
                timestampFinishLineIn: { not: null }
            }
        })

        if (alreadyUpdated.length > 0) {
            return new NextResponse("Already updated this RFID", { status: 409 });
        }

        // If not, Update the product
        await db.product.updateMany({
            where: {
                rfid: {
                    rfid: rfidTag,
                    isActive: true
                }
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
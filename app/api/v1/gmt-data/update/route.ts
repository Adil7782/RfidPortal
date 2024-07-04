import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!qrCode) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }
        
        const existingGmt = await db.gmtData.findUnique({
            where: {
                gmtBarcode: qrCode,
                timestampProduction: null
            }
        });

        if (!existingGmt) {
            return new NextResponse("Gmt data is already updated!", { status: 409 })
        };

        const updatedGmt = await db.gmtData.update({
            where: {
                gmtBarcode: qrCode
            },
            data: {
                timestampProduction: timestamp
            }
        })

        return NextResponse.json({ data: updatedGmt, message: 'Updated timestamp successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[UPDATE_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
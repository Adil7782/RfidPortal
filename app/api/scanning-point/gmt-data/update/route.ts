import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');
    const obbSheetId = url.searchParams.get('obb');

    if (!qrCode) {
        return new NextResponse("Bad Request: Missing required fields", { status: 400 });
    }

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        const existingGmt = await db.gmtData.findUnique({
            where: {
                gmtBarcode: qrCode
            }
        });

        if (!existingGmt) {
            return new NextResponse("No garment data found", { status: 400 });
        }

        if (existingGmt.timestampProduction !== null) {
            return new NextResponse("Garment is already updated!", { status: 409 });
        }

        const updatedGmt = await db.gmtData.update({
            where: {
                gmtBarcode: qrCode
            },
            data: {
                timestampProduction: timestamp,
                obbSheetId
            }
        });

        return NextResponse.json({ data: updatedGmt, message: 'Updated gmt data successfully!'}, { status: 200 });
    } catch (error) {
        console.error("[UPDATE_GMT_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
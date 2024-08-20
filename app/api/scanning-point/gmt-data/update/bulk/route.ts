import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PUT(
    req: Request,
) {
    const qrCodes: string[] = await req.json();

    if (qrCodes.length === 0) {
        return new NextResponse("Bad Request: Missing required fields", { status: 400 });
    }

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        // Fetch all QR codes from the database that are in the input list
        const matchedGmts = await db.gmtData.findMany({
            where: {
                gmtBarcode: { in: qrCodes }
            },
            select: { 
                gmtBarcode: true, 
                timestampProduction: true 
            }
        });

        // Determine which QR codes exist in the database
        const existingCodes = matchedGmts.map(gmt => gmt.gmtBarcode);
        const nonExistentCodes = qrCodes.filter(code => !existingCodes.includes(code));
        const needUpdate = matchedGmts.filter(gmt => gmt.timestampProduction === null).map(gmt => gmt.gmtBarcode);

        // Update records that need a timestamp
        await Promise.all(needUpdate.map(code =>
            db.gmtData.update({
                where: { gmtBarcode: code },
                data: { timestampProduction: timestamp }
            })
        ));

        if (nonExistentCodes.length > 0) {
            // If all QR codes are non-existent
            if (nonExistentCodes.length === qrCodes.length) {
                return NextResponse.json({
                    message: "None of the QR codes exist in the database.",
                    updated: null,
                    nonExistent: nonExistentCodes
                }, { status: 409 });
            }
            // If some QR codes are non-existent
            return NextResponse.json({
                message: 'Some QR codes do not exist in the database.',
                updated: needUpdate,
                nonExistent: nonExistentCodes
            }, { status: 202 });
        } else {
            // All QR codes exist and were updated
            return NextResponse.json({
                message: 'All existing QR codes were updated with timestamp.',
                updated: needUpdate,
                nonExistent: null
            }, { status: 201 });
        }
    } catch (error) {
        console.error("[UPDATE_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!id) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }
        
        const existingGmt = await db.gmtData.findUnique({
            where: {
                id,
                timestampProduction: null
            }
        });

        if (!existingGmt) {
            return new NextResponse("Gmt data is already updated!", { status: 409 })
        };

        const updatedGmt = await db.gmtData.update({
            where: {
                id
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
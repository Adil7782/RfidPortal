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

        const existingBundle = await db.bundleData.findUnique({
            where: {
                id,
                storeOutTimestamp: null
            }
        });

        if (!existingBundle) {
            return new NextResponse("Bundle is already updated!", { status: 409 })
        };

        const updatedBundle = await db.bundleData.update({
            where: {
                id
            },
            data: {
                storeOutTimestamp: timestamp
            }
        })

        return NextResponse.json({ data: updatedBundle, message: 'Updated timestamp successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[UPDATE_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
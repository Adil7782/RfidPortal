import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

type BodyType = {
    po: string;
    lineId: string;
    lineName: string;
    bundleIds: string[];
}

export async function PUT(
    req: Request,
) {
    const body: BodyType = await req.json();
    const po = body.po;
    const lineId = body.lineId;
    const lineName = body.lineName;
    const bundleIds = body.bundleIds;
    
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    
    try {
        if (bundleIds.length === 0) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        for (const bundleId of bundleIds) {
            const existingBundle = await db.bundleData.findUnique({
                where: {
                    id: bundleId
                }
            });
    
            // Update the bundle data
            const updatedBundle = await db.bundleData.update({
                where: {
                    id: bundleId
                },
                data: {
                    timestampStoreOut: timestamp
                }
            });
    
            // Update the GMT data
            await db.gmtData.updateMany({
                where: {
                    bundleId: bundleId
                },
                data: {
                    po,
                    lineId,
                    lineName
                }
            });
        }

        return new NextResponse('Updated bundle data successfully!', { status: 201 });
    } catch (error) {
        console.error("[UPDATE_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
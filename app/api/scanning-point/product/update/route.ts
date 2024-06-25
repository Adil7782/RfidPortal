import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

type RequestDataType = {
    pointNo: number;
    rfidTags: string[];
}

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        8: 'timestampButtonOut',
        9: 'timestampWashIn',
        12: 'timestampWashOut',
        13: 'timestampFinishIn',
        16: 'timestampFinishOut',
        17: 'timestampPackIn'
    };
    return timestampFields[pointNo];
}

export async function PUT(
    req: Request,
) {
    const body: RequestDataType = await req.json();
    const { pointNo, rfidTags } = body;

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!pointNo || !rfidTags) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const timestampField = getTimestampField(pointNo);

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid Bulk reading point number", { status: 400 });
        }

        const alreadyUpdated = await db.product.count({
            where: {
                rfid: {
                    rfid: {
                        in: rfidTags
                    }
                },
                [timestampField]: { not: null }
            }
        });
        console.log("PRODUCTS:", alreadyUpdated);

        if (alreadyUpdated > 0) {
            return new NextResponse("Already updated these RFID", { status: 409 });
        }

        await db.product.updateMany({
            where: {
                rfid: {
                    rfid: {
                        in: rfidTags
                    }
                }
            },
            data: {
                currentPointNo: pointNo,
                [timestampField]: timestamp
            }
        })

        return new NextResponse("Updated product successfully", { status: 200 });
    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
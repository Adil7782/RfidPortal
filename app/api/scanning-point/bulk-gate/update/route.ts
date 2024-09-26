import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

type RequestDataType = {
    pointNo: number;
    rfidTags: string[];
}

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        10: 'timestampButtonOut',
        11: 'timestampWashIn',
        14: 'timestampWashOut',
        15: 'timestampFinishIn',
        18: 'timestampFinishOut',
        19: 'timestampPackIn'
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

        const updateResponse = await db.product.updateMany({
            where: {
                rfid: {
                    rfid: {
                        in: rfidTags
                    },
                    isActive: true,
                },
                [timestampField]: null
            },
            data: {
                currentPointNo: pointNo,
                [timestampField]: timestamp
            }
        });

        if (updateResponse.count === 0) {
            return NextResponse.json({ 
                message: "No new updates were needed; all selected items were previously updated."
            }, { status: 200 });
        } else if (updateResponse.count === rfidTags.length) {
            return NextResponse.json({
                message: "Updated all tags successfully!"
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: `Successfully updated ${updateResponse.count} of the tags!`
            }, { status: 200 });
        }

    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

type RequestDataType = {
    pointNo: number;
    rfidTags: string[];
}

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        11: 'timestampButtonOut',
        12: 'timestampWashIn',
        15: 'timestampWashOut',
        16: 'timestampFinishIn',
        19: 'timestampFinishOut',
        20: 'timestampPackIn'
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
        const previousPointNo = pointNo - 1;

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid Bulk reading point number", { status: 400 });
        }

        // Filter out undefined or null values from rfidTags array
        const filteredRfidTags = rfidTags.filter(Boolean);

        // Fetch all products with the given RFID tags
        const products: any = await db.product.findMany({
            where: {
                rfid: {
                    rfid: { in: filteredRfidTags },
                    isActive: true,
                }
            },
            select: {
                rfid: { select: { rfid: true } },
                currentPointNo: true,
                [timestampField]: true
            },
        });

        // Categorize products into not-valid and exist
        const notValidTags: { rfid: string; currentPointNo: number }[] = [];
        const existTags: { rfid: string }[] = [];
        const validRfidTags: string[] = [];

        products.forEach((product: any) => {
            // if (product[timestampField]) {
            //     // Timestamp already exists
            //     existTags.push({ rfid: product.rfid.rfid });
            // } else if (product.currentPointNo !== previousPointNo) {
            //     // Product has not passed the previous point
            //     notValidTags.push({
            //         rfid: product.rfid.rfid,
            //         currentPointNo: product.currentPointNo,
            //     });
            // } else {
            //     // Product is valid for updating
            //     validRfidTags.push(product.rfid.rfid);
            // }
            if (product[timestampField]) {
                // Timestamp already exists
                existTags.push({ rfid: product.rfid.rfid });
            } else {
                // Product is valid for updating
                validRfidTags.push(product.rfid.rfid);
            }
        });

        // If there are valid RFID tags to update, perform the update
        let updateResponse = { count: 0 };
        if (validRfidTags.length > 0) {
            // Update the timestamp field
            updateResponse = await db.product.updateMany({
                where: {
                    rfid: {
                        rfid: {
                            in: validRfidTags,
                        },
                        isActive: true,
                    },
                    [timestampField]: null,
                },
                data: {
                    currentPointNo: pointNo,
                    [timestampField]: timestamp,
                },
            });
            
            // Update the active status to reuse the same RFID tags to another product
            await db.rfid.updateMany({
                where: {
                    rfid: {
                        in: validRfidTags,
                    },
                    isActive: true,
                },
                data: {
                    isActive: false,
                },
            });
        }

        // Construct response message
        let message = '';
        if (updateResponse.count === 0 && existTags.length === 0 && notValidTags.length === 0) {
            message = "No updates were made.";
        } else {
            message = `Updated ${updateResponse.count} RFID tags.`;
        }

        return NextResponse.json({
            success: true,
            message,
            notValid: notValidTags.length > 0 ? {
                message: "Some products have not passed the required previous point.",
                data: notValidTags,
            } : undefined,
            exist: existTags.length > 0 ? {
                message: "Some products have already been updated!",
                data: existTags,
            } : undefined,
        }, { status: 200 });

    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return NextResponse.json({
            success: false,
            message: "Internal Error",
        }, { status: 500 });
    }
}
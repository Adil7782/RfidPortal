import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

type RequestDataType = {
    pointNo: number;
    rfidTags: string[];
}

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: Record<number, string> = {
        9: "timestampEndQc",
        10: "timestampButtonQc",
        11: "timestampButtonOut",
        12: "timestampWashIn",
        13: "timestampDryQc",
        14: "timestampWetQc",
        15: "timestampWashOut",
        16: "timestampFinishIn",
        17: "timestampFinishLineIn",
        18: "timestampFinishLineQc",
        19: "timestampFinishOut",
        20: "timestampPackIn",
    };
    return timestampFields[pointNo];
}

export async function PUT(
    req: Request,
) {
    try {
        const body: RequestDataType = await req.json();
        const { pointNo, rfidTags } = body;

        if (!pointNo || !rfidTags || rfidTags.length === 0) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const timestampField = getTimestampField(pointNo);

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid Bulk reading point number", { status: 400 });
        }

        const filteredRfidTags = rfidTags.filter(Boolean);  // Remove null/undefined values

        const timezone = process.env.NODE_ENV === "development" ? "Asia/Colombo" : "Asia/Dhaka";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        // Fetch all products with the given RFID tags
        const products = await db.product.findMany({
            where: {
                rfid: {
                    rfid: { in: filteredRfidTags },
                    isActive: true,
                }
            },
            include: { rfid: true },
        });

        // Categorize products into not-valid and exist
        const notValidTags: { rfid: string; currentPointNo: number }[] = [];
        const existTags: { rfid: string }[] = [];
        const validRfidTags: string[] = [];

        for (const product of products) {
            const previousPointField = getTimestampField(pointNo - 1);

            if (product[timestampField as keyof typeof product]) {
                // Product already has a timestamp for the current point
                existTags.push({ rfid: product.rfid.rfid });
                continue;
            }

            // if (previousPointField) {
            //     const obbRoute = await db.obbSheetRoute.findUnique({
            //         where: { obbSheetId: product.obbSheetId },
            //     });

            //     const routeKey = previousPointField.replace("timestamp", "").toLowerCase();
            //     if (!obbRoute || !obbRoute[routeKey as keyof typeof obbRoute]) {
            //         notValidTags.push({
            //             rfid: product.rfid.rfid,
            //             currentPointNo: product.currentPointNo as number,
            //         });
            //         continue;
            //     }
            // }

            // Valid RFID for updating
            validRfidTags.push(product.rfid.rfid);
        }

        // Perform updates for valid RFID tags
        let updateResponse = { count: 0 };
        if (validRfidTags.length > 0) {
            updateResponse = await db.product.updateMany({
                where: {
                    rfid: {
                        rfid: { in: validRfidTags },
                        isActive: true,
                    },
                    [timestampField]: null,
                },
                data: {
                    currentPointNo: pointNo,
                    [timestampField]: timestamp,
                },
            });
        }

        // Construct response message
        const message = `Updated ${updateResponse.count} RFID tags.${
            notValidTags.length > 0 ? " Some products failed validation." : ""
        }`;

        return NextResponse.json(
            {
                success: true,
                message,
                notValid: notValidTags.length > 0
                    ? { message: "Some products have not passed the required previous point.", data: notValidTags }
                    : undefined,
                exist: existTags.length > 0
                    ? { message: "Some products have already been updated!", data: existTags }
                    : undefined,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("[UPDATE_PRODUCT_ERROR]", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Error",
            },
            { status: 500 }
        );
    }
}
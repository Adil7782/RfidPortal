import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

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

export async function POST(
    req: Request,
) {
    try {
        const body: QCPayloadDataType = await req.json();
        const { productId, qcPointId, part, obbSheetId, qcStatus, defects } = body;
    
        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

        if (!productId || !qcPointId || !obbSheetId || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const scanningPoint = await db.scanningPoint.findUnique({
            where: { id: qcPointId }
        });

        if (!scanningPoint || !scanningPoint?.pointNo) {
            return new NextResponse("QC point doest not exist", { status: 409 })
        }

        const timestampField = getTimestampField(scanningPoint.pointNo);
        const previousPointNo = scanningPoint.pointNo - 1;

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid QC point number", { status: 400 });
        }

        // Validate the previous QC point
        const previousTimestampField = getTimestampField(previousPointNo);

        if (previousTimestampField) {
            const obbRoute = await db.obbSheetRoute.findUnique({
                where: { obbSheetId },
            });
        
            if (!obbRoute) {
                return new NextResponse("Bad Request: No route found for the provided obbSheetId.", {
                    status: 400,
                });
            }
        
            // Ensure `previousTimestampField` is a key of `obbRoute`
            if (!(previousTimestampField in obbRoute)) {
                return new NextResponse(
                    `Bad Request: Invalid QC point. The field ${previousTimestampField} does not exist.`,
                    { status: 400 }
                );
            }
        
            if (!obbRoute[previousTimestampField as keyof typeof obbRoute]) {
                return new NextResponse(
                    "Bad Request: The previous QC point is not completed.",
                    { status: 400 }
                );
            }
        }

        // Check if QC has already been recorded
        const existingQcStatus = await db.productDefect.findMany({
            where: {
                productId,
                part,
                qcStatus: { not: "rework" },
            },
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("Conflict: QC has already been recorded for this garment!", { status: 409 })
        };

        if (qcStatus === 'pass') {
            await db.productDefect.create({
                data: {
                    id: generateUniqueId(),
                    productId,
                    qcPointId,
                    part,
                    obbSheetId,
                    qcStatus,
                    timestamp
                }
            })
        } else {
            await db.productDefect.create({
                data: {
                    id: generateUniqueId(),
                    productId,
                    qcPointId,
                    part,
                    obbSheetId,
                    qcStatus,
                    timestamp,
                    defects: {
                        connect: defects.map(defectId => ({ id: defectId }))
                    }
                }
            });
        };

        // Update product timestamp and current location
        await db.product.update({
            where: {
                id: productId
            },
            data: {
                currentPointNo: scanningPoint.pointNo,
                [timestampField]: timestamp
            }
        });

        return new NextResponse("Product QC recorded successfully", { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
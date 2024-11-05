import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        10: 'timestampButtonQc',
        13: 'timestampDryQc',
        14: 'timestampWetQc',
        18: 'timestampFinishLineQc'
    };
    return timestampFields[pointNo];
}

export async function POST(
    req: Request,
) {
    const body: QCPayloadDataType = await req.json();
    const productId = body.productId;
    const qcPointId = body.qcPointId;
    const part = body.part;
    const obbSheetId = body.obbSheetId;
    const qcStatus = body.qcStatus;
    const defects = body.defects;

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
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

        const existingQcStatus = await db.productDefect.findMany({
            where: {
                productId,
                part,
                qcStatus: { not: "rework" }
            }
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("QC was already checked for this garment!", { status: 409 })
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
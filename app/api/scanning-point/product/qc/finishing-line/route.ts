import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

type PayloadDataType = {
    productId: string;
    qcPointId: string;
    part: string;
    fline: string;
    qcStatus: string;
    defects: string[];
}

export async function POST(
    req: Request,
) {
    const body: PayloadDataType = await req.json();
    const productId = body.productId;
    const qcPointId = body.qcPointId;
    const part = body.part;
    const finishingLine = body.fline;
    const qcStatus = body.qcStatus;
    const defects = body.defects;

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!productId || !qcPointId || !finishingLine || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const scanningPoint = await db.scanningPoint.findUnique({
            where: { id: qcPointId }
        });

        if (!scanningPoint || !scanningPoint?.pointNo) {
            return new NextResponse("QC point doest not exist", { status: 409 })
        }

        const product = await db.product.findUnique({
            where: {
                id: productId,
                timestampFinishLineIn: { not: null }
            }
        });

        if (!product) {
            return new NextResponse("Garment is not passed Finishing Line IN section", { status: 409 })
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
                    finishingLine,
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
                    finishingLine,
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
                timestampFinishLineQc: timestamp
            }
        });

        return new NextResponse("Product QC recorded successfully", { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

function getTimestampField(pointNo: number): string | undefined {
    const timestampFields: { [key: number]: string } = {
        8: 'timestampAssembleQc',
        9: 'timestampEndQc',
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
    const body: AssemblyQCPayloadDataType = await req.json();
    const productId = body.productId;
    const qcPointId = body.qcPointId;
    const part = body.part;
    const obbSheetId = body.obbSheetId;
    const qcStatus = body.qcStatus;
    const operations = body.operations;

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!productId || !qcPointId || !obbSheetId || !qcStatus || !operations) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const qcPoint = await db.scanningPoint.findUnique({
            where: { id: qcPointId }
        })

        if (!qcPoint) {
            return new NextResponse("QC point not found", { status: 409 });
        }

        // Dynamically find the timestamp field
        const timestampField = getTimestampField(qcPoint.pointNo);

        if (!timestampField) {
            return new NextResponse("Bad Request: Invalid QC point number", { status: 400 });
        }

        const existingQcStatus = await db.productDefect.findMany({
            where: {
                productId,
                part,
            }
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("QC was already checked for this garment!", { status: 409 })
        }

        // Check the product is passed the previous section
        // const productCount = await db.product.count({
        //     where: {
        //         id: productId,
        //         currentPointNo: qcPoint.pointNo - 1,
        //     }
        // });

        // if (productCount === 0) {
        //     return new NextResponse(`Garment is not passed the section:${qcPoint.pointNo - 1}`, { status: 409 });
        // }

        if (qcStatus === 'pass' || operations.length === 0) {
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
            for (const operation of operations) {
                await db.productDefect.create({
                    data: {
                        id: generateUniqueId(),
                        productId,
                        qcPointId,
                        part,
                        obbSheetId,
                        qcStatus,
                        timestamp,
                        obbOperationId: operation.obbOperationId,
                        operatorId: operation.operatorId,
                        operatorName: operation.operatorName,
                        defects: {
                            connect: operation.defects.map(defectId => ({ id: defectId }))
                        }
                    }
                });
            }
        };

        // Update product timestampAssembleQc and current location
        await db.product.update({
            where: {
                id: productId
            },
            data: {
                currentPointNo: qcPoint.pointNo,
                [timestampField]: timestamp
            }
        })

        return new NextResponse("Product QC recorded successfully", { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
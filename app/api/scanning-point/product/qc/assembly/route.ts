import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

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

        const existingQcStatus = await db.productDefect.findMany({
            where: {
                productId
            }
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("QC was already checked for this garment!", { status: 409 })
        }

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

        // Update product timestampAssembleQc
        await db.product.update({
            where: {
                id: productId
            },
            data: {
                timestampAssembleQc: timestamp
            }
        });

        return new NextResponse("Product QC recorded successfully", { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
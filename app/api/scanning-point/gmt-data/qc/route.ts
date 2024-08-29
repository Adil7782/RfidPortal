import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const body: GmtQCPayloadDataType = await req.json();
    const gmtId = body.gmtId;
    const part = body.part;
    const qcPointId = body.qcPointId;
    const obbSheetId = body.obbSheetId;
    const qcStatus = body.qcStatus;
    const operations = body.operations;

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!gmtId || !part || !qcPointId || !obbSheetId || !qcStatus || !operations) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Check the GMT is passed the Productionn Line IN section
        const existingGmtCount = await db.gmtData.count({
            where: {
                id: gmtId,
                timestampProduction: { not: null }
            }
        });

        if (existingGmtCount === 0) {
            return new NextResponse("GMT data is not passed Line IN section!", { status: 409 })
        }

        const existingQcStatus = await db.gmtDefect.findMany({
            where: {
                gmtId,
                qcStatus: { not: "rework" }
            }
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("QC was already checked for this garment!", { status: 409 })
        }

        if (qcStatus === 'pass' || operations.length === 0) {
            await db.gmtDefect.create({
                data: {
                    id: generateUniqueId(),
                    gmtId,
                    part,
                    qcPointId,
                    obbSheetId,
                    qcStatus,
                    timestamp
                }
            })
        } else {
            for (const operation of operations) {
                await db.gmtDefect.create({
                    data: {
                        id: generateUniqueId(),
                        gmtId,
                        part,
                        qcPointId,
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

        return new NextResponse("Garment QC recorded successfully", { status: 201 });
    } catch (error) {
        console.error("[GMT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
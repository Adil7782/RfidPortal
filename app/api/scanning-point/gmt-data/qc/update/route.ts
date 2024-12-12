import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function PUT(
    req: Request,
) {
    const body = await req.json();
    const id: string = body.id;
    const qcStatus: string = body.qcStatus;
    const operations: GmtQCPayloadDataType["operations"] = body.operations;

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!id || !qcStatus || operations.length === 0) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Fetch the existing pass garment defect
        const existingGmtDefect = await db.gmtDefect.findUnique({
            where: {
                id
            }
        });

        if (!existingGmtDefect) {
            return new NextResponse("Garment defect not found", { status: 409 });
        }

        // Delete the passes defect
        await db.gmtDefect.delete({
            where: {
                id
            }
        });

        // Create new reject/rework defect status intread of pass defects
        for (const operation of operations) {
            await db.gmtDefect.create({
                data: {
                    id: generateUniqueId(),
                    gmtId: existingGmtDefect.gmtId,
                    part: existingGmtDefect.part,
                    qcPointId: existingGmtDefect.qcPointId,
                    obbSheetId: existingGmtDefect.obbSheetId,
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

        return new NextResponse("Garment QC updated successfully", { status: 201 });
    } catch (error) {
        console.error("[GMT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
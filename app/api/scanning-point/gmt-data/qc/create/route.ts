import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";
import { connect } from "http2";

export async function POST(
    req: Request,
) {
    const { gmtBarcode, part, qcPointId, obbSheetId, } = await req.json();
    const id = generateUniqueId();

    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!gmtBarcode || !part || !qcPointId || !obbSheetId) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Check the GMT is passed the Productionn Line IN section
        const existingGmtData = await db.gmtData.findUnique({
            where: {
                gmtBarcode
            }
        });

        if (!existingGmtData?.timestampProduction) {
            return new NextResponse("GMT data is not passed Line IN section!", { status: 409 })
        }

        const existingQcStatus = await db.gmtDefect.findMany({
            where: {
                gmtData: {
                    gmtBarcode
                },
                qcStatus: { not: "rework" }
            }
        });

        if (existingQcStatus.length > 0) {
            return new NextResponse("QC was already checked for this garment!", { status: 409 })
        }

        await db.gmtDefect.create({
            data: {
                id,
                gmtId: existingGmtData.id,
                part,
                qcPointId,
                obbSheetId,
                timestamp
            }
        })

        return NextResponse.json({ gmtDefectId: id, message: "Garment QC passed successfully"}, { status: 201 });
    } catch (error) {
        console.error("[GMT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { gmtId, qcPointId, qcStatus, defects } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!gmtId || !qcPointId || !qcStatus) {
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

        const newProductDefect = await db.gmtDefect.create({
            data: {
                id: generateUniqueId(),
                gmtId,
                qcPointId,
                qcStatus,
                timestamp,
                defects: {
                    connect: defects.map((defectId: string) => ({ id: defectId }))
                }
            }
        });

        return NextResponse.json({ data: newProductDefect, message: 'GMT defects recorded successfully'}, { status: 201 });
    } catch (error) {
        console.error("[GMT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
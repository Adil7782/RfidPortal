import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { gmtId, qcSectionId, qcStatus, defects } = await req.json();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!gmtId || !qcSectionId || !qcStatus) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const newProductDefect = await db.gmtDefect.create({
            data: {
                id: generateUniqueId(),
                gmtId,
                qcSectionId,
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
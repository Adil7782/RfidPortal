import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { userEmail, dailyTarget, workingHours, qcSectionId } = await req.json();
    const id = generateUniqueId();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');

    try {
        const existingTarget = await db.qcSectionTarget.findMany({
            where: {
                date: today,
                qcSectionId
            }
        });

        if (existingTarget.length > 0) {
            return new NextResponse("Already created the target for this QC section!", { status: 409 })
        };

        const createdTarget = await db.qcSectionTarget.create({
            data: {
                id,
                userEmail,
                qcSectionId,
                dailyTarget,
                workingHours,
                date: today
            }
        });

        return NextResponse.json({ data: createdTarget, message: 'QC section target created successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[QCSECTION_TARGET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
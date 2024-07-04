import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qcSectionId = url.searchParams.get('id');
    
    try {
        if (!qcSectionId) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const qcTarget = await db.qcSectionTarget.findUnique({
            where: {
                qcSectionId
            }
        });

        return NextResponse.json({ data: qcTarget, message: 'Fetched QC target successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_QC_TARGET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');
    
    try {
        if (!qrCode) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const gmtData = await db.gmtData.findUnique({
            where: {
                gmtBarcode: qrCode
            }
        });

        return NextResponse.json({ data: gmtData, message: 'Fetched Data successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_BUNDLE_DATA_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qrCode = url.searchParams.get('qrCode');

    if (!qrCode) {
        return new NextResponse("QR code is undefined!", { status: 409 });
    }

    try {
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
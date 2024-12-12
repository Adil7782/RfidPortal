import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const rfid = url.searchParams.get('rfid');

    try {
        if (!rfid) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const existingRfid = await db.rfid.findFirst({
            where: {
                rfid,
                isActive: true
            },
            select: {
                product: {
                    select: {
                        id: true,
                        rfidId: true,
                        frontGmt: true
                    }
                }
            }
        });

        return NextResponse.json({ data: existingRfid?.product, message: 'Product fetched successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_PRODUCT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
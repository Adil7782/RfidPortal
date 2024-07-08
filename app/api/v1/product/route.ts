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

        const existingRfid = await db.rfid.findUnique({
            where: {
                rfid
            },
            select: {
                product: {
                    select: {
                        id: true,
                        rfidId: true,
                        scanningPoint: {
                            select: {
                                name: true,
                            }
                        },
                        frontGmt: {
                            select: {
                                color: true,
                                size: true,
                                styleNo: true,
                                buyerName: true,
                                shade: true,
                                timestampProduction: true
                            }
                        },
                        timestampAssembled: true
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
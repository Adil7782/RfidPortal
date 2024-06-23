import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    const { rfid, frontGmtId, backGmtId } = await req.json();
    const productId = generateUniqueId();
    const rfidId = generateUniqueId();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');

    try {
        if (!rfid && !frontGmtId && !backGmtId) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const activeRfid = await db.rfid.findUnique({
            where: {
                rfid,
                isActive: true,
            }
        });

        if (activeRfid) {
            return new NextResponse("RFID tag is in active, please use another one!", { status: 409 })
        };

        // Create a new RFID
        await db.rfid.create({
            data: {
                id: rfidId,
                rfid
            }
        });

        // Create a new product
        const newProduct = await db.product.create({
            data: {
                id: productId,
                rfidId,
                frontGmtId,
                backGmtId,
                assembledTimestamp: timestamp
            }
        });

        return NextResponse.json({ data: newProduct, message: 'Product created successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[PRODUCT_ASSEMBLE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
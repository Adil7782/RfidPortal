import { NextResponse } from "next/server";
import moment from "moment-timezone";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
) {
    const url = new URL(req.url);
    const qcSectionId = url.searchParams.get('id');

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;
    
    try {
        if (!qcSectionId) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        const productDefects = await db.gmtDefect.findMany({
            where: {
                qcSectionId,
                timestamp: {
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                id: true,
                qcStatus: true,
                timestamp: true,
                defects: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        return NextResponse.json({ data: productDefects, message: 'Fetched GMT defects successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[FETCH_GMT_DEFECTS_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
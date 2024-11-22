"use server"

import moment from "moment-timezone";
import { GmtData } from "@prisma/client";

import { db } from "@/lib/db";

export async function fetchGmtDataForLineIN( part: string, obbSheetId: string ): Promise<GmtData[]> {
    try {
        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = moment().tz(timezone).format('YYYY-MM-DD');
        // const startDate = `${today} 00:00:00`;
        // const endDate = `${today} 23:59:59`;
        const startDate = `2024-08-14 00:00:00`;
        const endDate = `2024-08-14 23:59:59`;

        const data = await db.gmtData.findMany({
            where: {
                partName: part.toUpperCase(),
                // timestampProduction: {
                //     gte: startDate,
                //     lte: endDate
                // }
                obbSheetId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return new Promise((resolve) => resolve(data as GmtData[]));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}
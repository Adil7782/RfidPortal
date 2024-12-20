"use server"

import { db } from '@/lib/db';

import { ObbSheetRoute } from '@prisma/client';

export async function fetchObbRoute(obbSheetId: string) : Promise<ObbSheetRoute | null> {
    try {
        const data = await db.obbSheetRoute.findUnique({
            where: {
                obbSheetId
            }
        });

        return new Promise((resolve) => resolve(data as ObbSheetRoute));
    } catch (error) {
        console.error("[FETCH_OBB_SHEET_ROUTE_ERROR]", error);
        return null;
    }
}
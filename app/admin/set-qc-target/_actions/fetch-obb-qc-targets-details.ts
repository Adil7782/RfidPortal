"use server"

import { db } from '@/lib/db';

import { ObbQcTarget } from '@prisma/client';

export async function fetchObbQcTargetsDetails(obbSheetId: string) : Promise<ObbQcTarget | null> {
    try {
        const data = await db.obbQcTarget.findUnique({
            where: {
                obbSheetId
            }
        });

        return new Promise((resolve) => resolve(data as ObbQcTarget));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return null;
    }
}
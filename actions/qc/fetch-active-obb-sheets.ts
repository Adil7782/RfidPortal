"use server"

import { neon } from '@neondatabase/serverless';

export async function fetchActiveObbSheets() : Promise<ActiveObbSheetsType> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const data = await sql`SELECT id, name
            FROM "ObbSheet"
            WHERE "isActive" = TRUE
            ORDER BY "createdAt" DESC;`;

        // console.log("ObbSheets:", data);
        return new Promise((resolve) => resolve(data as ActiveObbSheetsType));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_SHEET_ERROR]", error);
        return [];
    }
}
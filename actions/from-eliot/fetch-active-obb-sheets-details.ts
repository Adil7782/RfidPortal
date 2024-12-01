"use server"

import { neon } from '@neondatabase/serverless';

export async function fetchActiveObbSheetsDetails() : Promise<ObbSheetDetailsType[]> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const data = await sql`
            SELECT 
                os.id,
                os.name,
                os.version,
                pl.name AS "lineName",
                u.name AS "unitName",
                os.style,
                os.buyer,
                os.colour AS color,
                os."totalSMV",
                os."workingHours"
            FROM 
                "ObbSheet" os
            LEFT JOIN 
                "ProductionLine" pl ON os."productionLineId" = pl.id
            LEFT JOIN 
                "Unit" u ON os."unitId" = u.id
            WHERE 
                os."isActive" = true
            ORDER BY 
                os."createdAt" DESC;`;
        
        return new Promise((resolve) => resolve(data as ObbSheetDetailsType[]));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_SHEETS_DETAILS_ERROR]", error);
        return [];
    }
}
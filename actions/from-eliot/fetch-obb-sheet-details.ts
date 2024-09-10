"use server"

import { neon } from '@neondatabase/serverless';

export async function fetchObbSheetDetails( obbSheetId: string) : Promise<ObbSheetDetailsType | null> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const data = await sql`
            SELECT
                os.colour AS color,
                os.style,
                os.buyer,
                u.name AS "unitName",
                pl.name AS "lineName"
            FROM
                "ObbSheet" os
            LEFT JOIN
                "Unit" u ON os."unitId" = u.id
            LEFT JOIN
                "ProductionLine" pl ON os."productionLineId" = pl.id
            WHERE
                os.id = ${obbSheetId};`;

        // console.log("ObbSheets:", data);
        return new Promise((resolve) => resolve(data[0] as ObbSheetDetailsType));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return null;
    }
}
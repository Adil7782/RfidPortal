"use server";

import { neon } from "@neondatabase/serverless";

export async function fetchGmtDefects( scanningPointId:string, date:string ) : Promise<GmtDefectTypes[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    const data = await sql`
        SELECT 
            gd.id, 
            gd."gmtId", 
            gd."qcStatus", 
            gd.timestamp,
            ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'id', d.id,
                    'name', d.name
                )
            ) AS defects
        FROM 
            "GmtDefect" gd
        LEFT JOIN
            "_GmtQC" gdd ON gdd."B" = gd.id
        LEFT JOIN
            "Defect" d ON d.id = gdd."A"
        WHERE 
            gd."qcPointId" = ${scanningPointId}
            AND gd.timestamp >= ${startDate}
            AND gd.timestamp <= ${endDate}
        GROUP BY
            gd.id, gd."gmtId", gd."qcStatus", gd.timestamp
        ORDER BY 
            gd."createdAt" ASC;`;
    
    return new Promise((resolve) => resolve(data as GmtDefectTypes[] ))
}
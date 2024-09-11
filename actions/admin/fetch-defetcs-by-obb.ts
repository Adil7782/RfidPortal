"use server";

import { neon } from "@neondatabase/serverless";

export async function fetchGmtDefectsByObb( scanningPointId:string, obbSheetId: string, date:string ) : Promise<GmtDefectTypes[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    console.log("OBB", obbSheetId);
    
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
            AND gd."obbSheetId" = ${obbSheetId}
            AND gd.timestamp >= ${startDate}
            AND gd.timestamp <= ${endDate}
        GROUP BY
            gd.id, gd."gmtId", gd."qcStatus", gd.timestamp
        ORDER BY 
            gd."createdAt" ASC;`;

            console.log("backend date of defect",data)
    
    return new Promise((resolve) => resolve(data as GmtDefectTypes[] ))
}

export async function fetchEndQcByObb( scanningPointId:string, obbSheetId:string, date:string ) : Promise<GmtDefectTypes[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    const formatDate=`${date}%`

    const data=await sql `
    SELECT 
        pd.id, 
        pd."productId", 
        pd."qcStatus", 
        pd.timestamp,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'id', d.id,
                'name', d.name
            )
        ) AS defects,
        sp.name AS "scanningPointName"
    FROM 
        "ProductDefect" pd
    LEFT JOIN
        "_ProductQC" pqc ON pqc."B" = pd.id
    LEFT JOIN
        "Defect" d ON d.id = pqc."A"
    LEFT JOIN
        "ScanningPoint" sp ON sp.id = pd."qcPointId"
    WHERE 
        pd."qcPointId" = ${scanningPointId}
        AND pd."obbSheetId" = ${obbSheetId}
        AND pd.timestamp like ${formatDate}
    GROUP BY
        pd.id, pd."productId", pd."qcStatus", pd.timestamp, sp.name
    ORDER BY 
        pd.timestamp ASC;`;
    
    return new Promise((resolve) => resolve(data as GmtDefectTypes[] ))
}
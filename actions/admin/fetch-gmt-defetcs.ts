"use server";

import { neon } from "@neondatabase/serverless";

export async function fetchGmtDefects( scanningPointId:string, date:string ) : Promise<GmtDefectTypes[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
     console.log("Scanning point Iddddddddddd0123456",scanningPointId)
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

            console.log("backend date of defect",data)
    
    return new Promise((resolve) => resolve(data as GmtDefectTypes[] ))
}





export async function fetchEndQc( scanningPointId:string, date:string ) : Promise<GmtDefectTypes[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
     console.log("Scanning point Iddddddddddd0123456",scanningPointId)
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
    AND pd.timestamp like ${formatDate}
GROUP BY
    pd.id, pd."productId", pd."qcStatus", pd.timestamp, sp.name
ORDER BY 
    pd.timestamp ASC;
    `

    console.log("data of End Qc........",data)
    
    return new Promise((resolve) => resolve(data as GmtDefectTypes[] ))
}
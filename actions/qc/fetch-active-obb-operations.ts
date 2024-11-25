"use server"

import { neon } from '@neondatabase/serverless';

export async function fetchActiveObbOperations( obbSheetId: string, part: string ) : Promise<ActiveObbOperationsResType> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const data = await sql`
            SELECT 
                o.id, 
                o."seqNo", 
                op.name AS "operationName", 
                op.code AS "operationCode"
            FROM 
                "ObbOperation" AS o
            INNER JOIN 
                "Operation" AS op ON o."operationId" = op.id
            WHERE 
                o."obbSheetId" = ${obbSheetId} AND
                o.part = ${part} AND
                o."isActive" = TRUE
            ORDER BY 
                o."seqNo" ASC;`;

        // console.log("ObbSheets:", data);
        return new Promise((resolve) => resolve(data as ActiveObbOperationsResType));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}
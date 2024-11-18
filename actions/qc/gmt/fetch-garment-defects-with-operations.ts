"use server"

import moment from 'moment-timezone';
import { neon } from '@neondatabase/serverless';

import { db } from '@/lib/db';

export async function fetchGarmentDefectsWithOperations(qcPointId: string): Promise<GarmentDefectsDataTypesForQC[]> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = moment().tz(timezone).format('YYYY-MM-DD');
        const startDate = `${today} 00:00:00`;
        const endDate = `${today} 23:59:59`;

        let formatterdDefects: GarmentDefectsDataTypesForQC[] = [];

        const gmtDefects = await db.gmtDefect.findMany({
            where: {
                qcPointId: qcPointId,
                timestamp: {
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                id: true,
                gmtId: true,
                qcStatus: true,
                timestamp: true,
                obbOperationId: true,
                operatorName: true,
                defects: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        if (gmtDefects.length === 0) {
            return [];
        }

        for (const defect of gmtDefects) {
            if (defect.obbOperationId) {
                const data = await sql`
                    SELECT 
                        o.name AS "operationName",
                        o.code AS "operationCode"
                    FROM 
                        "ObbOperation" oo
                    INNER JOIN 
                        "Operation" o ON oo."operationId" = o.id
                    WHERE 
                        oo.id = ${defect.obbOperationId};`;
                
                formatterdDefects.push({
                    id: defect.id,
                    gmtId: defect.gmtId,
                    qcStatus: defect.qcStatus,
                    timestamp: defect.timestamp,
                    obbOperationId: defect.obbOperationId,
                    operatorName: defect.operatorName,
                    operationName: data[0].operationName,
                    operationCode: data[0].operationCode,
                    defects: defect.defects
                });

            } else {
                formatterdDefects.push({
                    id: defect.id,
                    gmtId: defect.gmtId,
                    qcStatus: defect.qcStatus,
                    timestamp: defect.timestamp,
                    obbOperationId: null,
                    operatorName: null,
                    defects: defect.defects
                });
            }
        }

        return new Promise((resolve) => resolve(formatterdDefects as GarmentDefectsDataTypesForQC[]));
    } catch (error) {
        console.error("[FETCH_GARMENT_DEFETCS_ERROR]", error);
        return [];
    }
}
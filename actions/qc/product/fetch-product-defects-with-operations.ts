"use server"

import moment from 'moment-timezone';
import { neon } from '@neondatabase/serverless';

import { db } from '@/lib/db';

type FetchProductDefectsWithOperationsProps = {
    qcPointId?: string, 
    part?: string, 
    date?: string,
    obbSheetId?: string,
}

export async function fetchProductDefectsWithOperations({
    qcPointId,
    part,
    date,
    obbSheetId,
}: FetchProductDefectsWithOperationsProps): Promise<ProductDefectsDataTypesForQC[]> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = date ?? moment().tz(timezone).format('YYYY-MM-DD');
        const startDate = `${today} 00:00:00`;
        const endDate = `${today} 23:59:59`;

        let formatterdDefects: ProductDefectsDataTypesForQC[] = [];

        const productDefects = await db.productDefect.findMany({
            where: {
                qcPointId: qcPointId,
                timestamp: {
                    gte: startDate,
                    lte: endDate
                },
                part,
                obbSheetId
            },
            select: {
                id: true,
                productId: true,
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

        if (productDefects.length === 0) {
            return [];
        }

        for (const defect of productDefects) {
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
                    productId: defect.productId,
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
                    productId: defect.productId,
                    qcStatus: defect.qcStatus,
                    timestamp: defect.timestamp,
                    obbOperationId: null,
                    operatorName: null,
                    defects: defect.defects
                });
            }
        }

        return new Promise((resolve) => resolve(formatterdDefects as ProductDefectsDataTypesForQC[]));
    } catch (error) {
        console.error("[FETCH_PRODUCT_DEFETCS_ERROR]", error);
        return [];
    }
}
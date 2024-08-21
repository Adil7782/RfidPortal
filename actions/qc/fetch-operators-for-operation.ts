"use server"

import { neon } from '@neondatabase/serverless';
import moment from 'moment-timezone';

export async function fetchOperatorsForOperation( operationId: string ) : Promise<OperatorsForOperationResType> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = moment().tz(timezone).format('YYYY-MM-DD');
        const startDate = `${today} 00:00:00`;
        const endDate = `${today} 23:59:59`;

        const data = await sql`
            SELECT 
                os.id,
                op.name AS name,
                op.rfid AS rfid,
                op."employeeId" AS "employeeId"
            FROM 
                "OperatorSession" AS os
            INNER JOIN 
                "Operator" AS op ON os."operatorRfid" = op.rfid
            WHERE 
                os."obbOperationId" = ${operationId} AND
                os."LoginTimestamp" >= ${startDate} AND
                os."LoginTimestamp" <= ${endDate}
            ORDER BY 
                os."createdAt" DESC;`;

        return new Promise((resolve) => resolve(data as OperatorsForOperationResType));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}
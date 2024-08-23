"use server"

import { neon } from '@neondatabase/serverless';
import moment from 'moment-timezone';

export async function fetchOperatorsForOperation(operationId: string): Promise<OperatorsForOperationResType> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");

        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
        const today = moment().tz(timezone).format('YYYY-MM-DD');
        const threeDaysBefore = moment().tz(timezone).add(-3, 'days').format('YYYY-MM-DD');
        const startDate = `${threeDaysBefore} 00:00:00`;
        const endDate = `${today} 23:59:59`;

        const data = await sql`
            SELECT 
                op.id AS id,
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

        function filterByUniqueRfid(operators: OperatorsForOperationResType): OperatorsForOperationResType {
            const seenRfids = new Set<string>();
            const filteredOperators: OperatorsForOperationResType = operators.filter(operator => {
                if (!seenRfids.has(operator.rfid)) {
                    seenRfids.add(operator.rfid);
                    return true;
                }
                return false;
            });
            return filteredOperators;
        }

        const uniqueOperators = filterByUniqueRfid(data as OperatorsForOperationResType);

        return new Promise((resolve) => resolve(uniqueOperators as OperatorsForOperationResType));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}
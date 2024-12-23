"use server"

import { neon } from '@neondatabase/serverless';

const findUnitIdByName = (unitName: string) => {
    switch (unitName) {     // got from from ELIoT DB
        case "AGL Unit 01":
            return "a3a611ae-a685-4d3d-b13b-d993809b1a8b";
        case "AGL Unit 02":
            return "01610cb9-7d21-483f-92b7-6b51be923509";
        case "AGL Unit 03":
            return "83571e58-1711-43ed-ad95-ae3b437cbf93";
        case "AGL Unit 04":
            return "d66d2a4a-9b6f-450c-8d00-c13528f1d8c6";
        case "AGL Unit 05":
            return "848521ee-d3f7-413a-bdda-d21cacc71167";
        default:
            throw new Error(`Invalid unit name: ${unitName}`);
    }
}

export async function fetchProductionLinesForUnit( unitName: string) : Promise<ProductionLineDetailsType[]> {
    try {
        const sql = neon(process.env.ELIOT_DATABASE_URL || "");
        const unitId = findUnitIdByName(unitName);

        const data = await sql`
            SELECT
                id,
                name
            FROM
                "ProductionLine"
            WHERE
                "unitId" = ${unitId};`;

        // console.log("ObbSheets:", data);
        return new Promise((resolve) => resolve(data as ProductionLineDetailsType[]));
    } catch (error) {
        console.error("[FETCH_ACTIVE_OBB_OPERATIONS_ERROR]", error);
        return [];
    }
}
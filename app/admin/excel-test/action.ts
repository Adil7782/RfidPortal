"use server";
import { neon } from "@neondatabase/serverless";


export async function getData(date:string)    {
    const sql = neon(process.env.DATABASE_URL || "");

    const data = await sql`WITH HourlyTotals AS (
    SELECT 
        pd.part, 
        COUNT(*) AS total_passed_products,          -- Count of passed products for each hour
        SUM(CASE WHEN pd."qcStatus" = 'pass' THEN 1 ELSE 0 END) AS total_passed_sum, -- Total sum of passed products for each hour
        sp."dailyTarget" AS target, 
        SUBSTRING(pd."timestamp" FROM 12 FOR 2) AS hour -- Extract hour
    FROM 
        "ProductDefect" pd
    INNER JOIN 
        "ScanningPoint" sp ON sp.id = pd."qcPointId"
    WHERE 
        pd."timestamp" LIKE ${date} 
    GROUP BY 
        pd.part, sp."dailyTarget", hour
)

SELECT 
    *,
    (SELECT SUM(total_passed_products) FROM HourlyTotals) AS grand_total -- Overall total for all hours
FROM 
    HourlyTotals
ORDER BY 
    hour; -- Order results by hour
`;

    //console.log("data fetched",data,111)


 
    return new Promise((resolve) => resolve(data ))
}

export async function getEfficiency(date:string)    {
    const sql = neon(process.env.DATABASE_URL || "");

    const data = await sql`Select * from "LineEfficiencyResources"   
    WHERE 
        date LIKE ${date}  
`;



    console.log("data fetched",data)


 
    return new Promise((resolve) => resolve(data ))
}
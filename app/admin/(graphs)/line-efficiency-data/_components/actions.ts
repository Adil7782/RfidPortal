"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import {  LineEfficiency, OperationBlock, QCRecord } from "./bar-chart-graph";


export async function getOperatorEfficiency(obbsheetid:string,date:string) : Promise<any[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    date=date+"%"

    
     const data = await sql`SELECT
    pd."part",
    COUNT(DISTINCT pd."gmtId") AS garment_count
FROM 
    "GmtDefect" pd
LEFT JOIN  
    "_GmtQC" gdd ON gdd."B" = pd.id
LEFT JOIN
    "Defect" d ON d.id = gdd."A"
WHERE
    pd."qcStatus" <> 'pass'
    AND pd."obbSheetId" = ${obbsheetid}
    AND pd."timestamp" LIKE ${date}
GROUP BY 
    pd."part"

UNION ALL

SELECT
    pd."part",
    COUNT(DISTINCT pd."productId") AS garment_count
FROM 
    "ProductDefect" pd
LEFT JOIN  
    "_GmtQC" gdd ON gdd."B" = pd.id
LEFT JOIN
    "Defect" d ON d.id = gdd."A"
WHERE
    pd."qcStatus" <> 'pass' 
    AND pd."obbSheetId" = ${obbsheetid}
    AND pd."timestamp" LIKE ${date}
GROUP BY 
    pd."part";
`
    
            // console.log(data)
            console.log(date,obbsheetid)
    
    
    return new Promise((resolve) => resolve(data as any[] ))
}


export async function getCount(obbsheetid:string,date:string) : Promise<QCRecord[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    date=date+"%"

    
     const data = await sql`select * from "ProductDefect" 
where timestamp like ${date} and "qcStatus" = 'pass'
group by "obbSheetId",id
order by "obbSheetId"
`
    
            // console.log(data)
            console.log(date,obbsheetid)
    
    
    return new Promise((resolve) => resolve(data as QCRecord[] ))
}
export async function getTarget(date:string) : Promise<LineEfficiency[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`
 select * from "LineEfficiencyResources"
 where date = ${date}
`
    
            // console.log(data)
           
    
    
    return new Promise((resolve) => resolve(data as LineEfficiency[] ))
}



export async function getAll()  : Promise<OperationBlock[]>   {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
     select os."id"  obbId,os."name" obbName,os."unitId" unitId,pl."name" lineName,u."name" unitName from "ObbSheet" os
inner join "ProductionLine" pl on pl.id = os."productionLineId"
inner join "Unit" u on u.id = pl."unitId"
group by os."id",os."name",os."unitId",pl."name",u."name" 

`;
    
            // console.log(data)
           
    
    
    return new Promise((resolve) => resolve(data as OperationBlock[]))
}


export async function getObb(unit:any) : Promise<{ id: string; name: string }[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
    select os.name as name ,os.id as id from "ObbSheet" os 

inner join "Unit" u on u.id= os."unitId"

where os."unitId"=${unit} and os."isActive"='TRUE'
 order by os."createdAt" desc

`
    return new Promise((resolve) => resolve(data as { id: string; name: string }[]))
}

export async function getUnit() : Promise<{ id: string; name: string }[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
     select id as id , name as name from "Unit" u 


 order by "createdAt" desc

`
    return new Promise((resolve) => resolve(data as { id: string; name: string }[]))
}
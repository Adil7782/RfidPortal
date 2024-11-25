"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import { defectData, lineTarget,  } from "./bar-chart-graph";
import { OperationBlock } from "../../line-efficiency-data/_components/bar-chart-graph";


export async function getOperatorEfficiency(obbsheetid:string,date:string) : Promise<defectData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`SELECT 
   
    count(pd.*) as count,ler."endQcTarget" as target
FROM  
    "ProductDefect" pd
 inner join "LineEfficiencyResources" ler on ler."obbSheetId" = pd."obbSheetId"
WHERE 
    
    AND pd."timestamp" LIKE ${date} 
    AND pd."qcStatus" ='pass'
    
    group by target
;
`
    
        
    
    return new Promise((resolve) => resolve(data as defectData[] ))
}
export async function getTarget(date:string) : Promise<lineTarget[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`SELECT DISTINCT ON ("lineName")
    "obbSheetId" AS obbid,
    "endQcTarget" AS target,
    "lineName" AS line,
    "date"
FROM "LineEfficiencyResources"
ORDER BY "lineName", "date" DESC;
;
`
    
        
    
    return new Promise((resolve) => resolve(data as lineTarget[] ))
}


export async function getAll()  : Promise<OperationBlock[]>   {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
      select os."id"  obbId,os."name" obbName,os."unitId" unitId,pl."name" lineName,u."name" unitName,os."style" obbstyle from "ObbSheet" os
inner join "ProductionLine" pl on pl.id = os."productionLineId"
inner join "Unit" u on u.id = pl."unitId"
where os."isActive" = true


group by os."id",os."name",os."unitId",pl."name",u."name" 
order by lineName

`;
    
            // console.log(data)
           
    
    
    return new Promise((resolve) => resolve(data as OperationBlock[]))
}

export async function getCount(date:string) : Promise<{count:number,obbid:string}[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`select count(distinct pd."productId"),"obbSheetId" obbid from "ProductDefect" pd 
where pd.timestamp like ${date+"%"} and "qcStatus" = 'pass'
group by "obbSheetId"
;
`
    
        
    
    return new Promise((resolve) => resolve(data as {count:number,obbid:string}[] ))
}



export async function getObb(unit:any) : Promise<{ id: string; name: string }[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
    select os.name as name ,os.id as id from "ObbSheet" os 

inner join "Unit" u on u.id= os."unitId"

where os."unitId"=${unit}
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

export async function getLine(obbsheetid:string)   {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
     select pl."id",pl."name" from "ProductionLine" pl
inner join "ObbSheet" os on os."productionLineId" =pl."id"
where os.id = ${obbsheetid}



`
    return new Promise((resolve) => resolve(data ))
}
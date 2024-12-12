"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import {  LineData, OperationBlock, QCRecord } from "./bar-chart-graph";



export async function getCount(date:string) : Promise<{count:string,obbSheetId:string}[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    date=date+"%"

    
     const data = await sql`select count(distinct "productId"),"obbSheetId" from "ProductDefect" 
where timestamp like  ${date} and part = 'line-end' 
group by "obbSheetId"
`
    
            // console.log(data)
        
    
    
    return new Promise((resolve) => resolve(data as {count:string,obbSheetId:string}[] ))
}
export async function getTarget(date:string) : Promise<LineData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`
 select 	"unitName" unitid,"obbSheetId","utilizedManPowers","totalSMV","workingHours" from "LineEfficiencyResources"
 where date = ${date}
`
    
            // console.log(data)
           
    
    
    return new Promise((resolve) => resolve(data as LineData[] ))
}



export async function getAll()  : Promise<OperationBlock[]>   {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
      select os."id"  obbId,os."name" obbName,os."unitId" unitId,pl."name" lineName,u."name" unitName,os."style" obbstyle from "ObbSheet" os
inner join "ProductionLine" pl on pl.id = os."productionLineId"
inner join "Unit" u on u.id = pl."unitId"
where os."isActive" = true


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
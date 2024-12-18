"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import { defectData } from "./bar-chart-graph";
import { LineData } from "../../line-efficiency-data/_components/bar-chart-graph";



export async function getCount(date:string) : Promise<{count:number,obbid:string}[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`select count(distinct pd."productId"),"obbSheetId" obbid from "ProductDefect" pd 
where pd.timestamp like ${date+"%"}
group by "obbSheetId"
;
`
    
        
    
    return new Promise((resolve) => resolve(data as {count:number,obbid:string}[] ))
}



export async function getOperatorEfficiency(obbsheetid:string,date:string) : Promise<defectData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    console.log(date,obbsheetid)
   
    console.log(date)
     const data = await sql
     `select count(pd."productId") count,ler."endQcTarget" target,
ler.style
from "ProductDefect" pd
left join "LineEfficiencyResources" ler on ler."obbSheetId" = pd."obbSheetId" and ler.date =${date}
where timestamp like ${date+"%"}
AND pd."qcStatus" = 'pass'
AND pd."part" = 'line-end'
AND pd."obbSheetId" = ${obbsheetid}
GROUP BY target,style

`
    
            console.log(data)
    
    
    return new Promise((resolve) => resolve(data as defectData[] ))
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



export async function getObb(unit:any) : Promise<{ id: string; name: string }[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
    select os.name as name ,os.id as id from "ObbSheet" os 

inner join "Unit" u on u.id= os."unitId"

where os."unitId"=${unit} and os."isActive"
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
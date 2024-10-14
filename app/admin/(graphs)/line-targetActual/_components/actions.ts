"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import { defectData } from "./bar-chart-graph";


export async function getOperatorEfficiency(obbsheetid:string,date:string) : Promise<defectData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`SELECT 
   
    count(pd.*) as count,ler."endQcTarget" as target
FROM  
    "ProductDefect" pd
 inner join "LineEfficiencyResources" ler on ler."obbSheetId" = pd."obbSheetId"
WHERE 
    pd."obbSheetId" = ${obbsheetid} 
    AND pd."timestamp" LIKE ${date}
    AND pd."qcStatus" ='pass'
    
    group by target
;
`
    
            console.log(data)
            console.log(date,obbsheetid)
    
    
    return new Promise((resolve) => resolve(data as defectData[] ))
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
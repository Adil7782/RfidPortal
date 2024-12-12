"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import { defectData } from "./bar-chart-graph";
type defData  = {
    defectcount:number,obbid:string
}


export async function getOperatorEfficiency(obbsheetid:string,date:string) : Promise<defectData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`SELECT
    pd."part",
    count(pd.id) AS garment_count
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
     count(pd.id) AS garment_count
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
    
            console.log(data)
            console.log(date,obbsheetid)
    
    
    return new Promise((resolve) => resolve(data as defectData[] ))
}

export async function getDefects(date:string) : Promise<defData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");
    // obbsheetid:string,date:string
    
     const data = await sql`select 
        count(gd.id) as defectcount,
       "obbSheetId" as obbid
      from "GmtDefect" gd
      left join "_GmtQC" gqc ON gqc."B" = gd.id
      left join "Defect" d ON d.id = gqc."A"
      where gd."qcStatus" <> 'pass' 
     
        and gd.timestamp like ${date}
        
        group by obbid 
        
        
      UNION
  select 
        count(pd.id) as defectcount,
        "obbSheetId" as obbid
       
      from "ProductDefect" pd
      left join "_ProductQC" pqc ON pqc."B" = pd.id
      left join "Defect" d ON d.id = pqc."A"
      where pd."qcStatus" <> 'pass' 
 
        and pd.timestamp like ${date}
      group by d.name,obbid
;
`
    
    
    
    return new Promise((resolve) => resolve(data as defData[] ))
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


export async function getChecked(date:string,obbSheetId:string) : Promise<{ total: number }>  {
    const sql = neon(process.env.DATABASE_URL || "");
    // obbsheetid:string,date:string
    
     const data = await sql`WITH counts AS (
    SELECT COUNT(*) AS gmt_count FROM "GmtDefect" gd WHERE gd.timestamp LIKE ${date} and gd."obbSheetId" = ${obbSheetId}
    UNION ALL
    SELECT COUNT(*) AS product_count FROM "ProductDefect" pd WHERE pd.timestamp LIKE ${date} and pd."obbSheetId" = ${obbSheetId}
)
SELECT SUM(gmt_count) AS total FROM counts;
`
    
return data[0] as { total: number };
}

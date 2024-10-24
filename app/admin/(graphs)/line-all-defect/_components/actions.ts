"use server";
import { neon } from "@neondatabase/serverless";
import { ProductionDataType } from "./analytics-chart";
import { defectData } from "./bar-chart-graph";
import { defectsData } from "@/app/admin/analytics/all-defects/_components/all-defect-chart";


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


export async function getDefectsAll(obbsheetid: string, date: string): Promise<defectsData[]> {
    const sql = neon(process.env.DATABASE_URL || "");
  
    const newdate = `${date}%`;
    console.log("obbsheet id and date", obbsheetid, newdate);
  
    const data = await sql`
      select 
        count(pd.id) as defectcount,
        d.name,
        pd.part
      from "ProductDefect" pd
      left join "_ProductQC" pqc ON pqc."B" = pd.id
      left join "Defect" d ON d.id = pqc."A"
      where pd."qcStatus" <> 'pass' 
        and pd."obbSheetId" = ${obbsheetid}
        and pd.timestamp like ${newdate}
      group by d.name,   pd.part
  
      UNION
  
      select 
        count(gd.id) as defectcount,
        d.name,
        gd.part
      from "GmtDefect" gd
      left join "_GmtQC" gqc ON gqc."B" = gd.id
      left join "Defect" d ON d.id = gqc."A"
      where gd."qcStatus" <> 'pass' 
        and gd."obbSheetId" = ${obbsheetid}
        and gd.timestamp like ${newdate}
        group by d.name,     gd.part
    `;
  
    console.log("defect Data", data);
  
    return new Promise((resolve) => resolve(data as defectsData[]));
  }
  
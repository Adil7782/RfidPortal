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


export async function getDefectsAll( date: string): Promise<defectsData[]> {
    const sql = neon(process.env.DATABASE_URL || "");
  
    const newdate = `${date}%`;
    console.log("obbsheet id and date",  newdate);
  
    const data = await sql`
       select 
        count(pd.id) as defectcount,
        d.name,pd."obbSheetId"
      from "ProductDefect" pd
      left join "_ProductQC" pqc ON pqc."B" = pd.id
      left join "Defect" d ON d.id = pqc."A"
      where pd."qcStatus" <> 'pass' 
       
        and pd.timestamp like ${date}
      group by d.name,pd."obbSheetId"
  
      UNION
  
      select 
        count(gd.id) as defectcount,
        d.name,gd."obbSheetId"
      from "GmtDefect" gd
      left join "_GmtQC" gqc ON gqc."B" = gd.id
      left join "Defect" d ON d.id = gqc."A"
      where gd."qcStatus" <> 'pass' 
       
        and gd.timestamp like ${date}
        group by d.name,gd."obbSheetId"
    `;
  
    console.log("defect Data", data);
  
    return new Promise((resolve) => resolve(data as defectsData[]));
  }
  
  
export async function getUnits() : Promise<{obbid: any; unit: string;line: string; units:string
}[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
    select u.name as unit,u.id units,pl.name as line,os.id as obbid,os.name as obbsheet from "Unit"u 
inner join "ProductionLine" pl on pl."unitId" = u.id
left join "ObbSheet" os on os."productionLineId" =pl.id

`
    return new Promise((resolve) => resolve(data as { unit: string;line: string; obbid: string;units :string }[]))
}
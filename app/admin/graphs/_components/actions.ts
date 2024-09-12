"use server"
import { neon } from "@neondatabase/serverless";
import { SMVChartData } from "./analytics-chart";

export async function getSMV(obbSheetId:String,date:String):Promise<SMVChartData[]> {
    
  const sql = neon(process.env.DATABASE_URL || "");

  const datef = `${date}%`; // Start of the day


const smv = await sql`SELECT 
    o.smv,
    concat(o."seqNo",' - ',op.name) as name,
    o."seqNo",
    AVG(CAST(p.smv AS NUMERIC)) AS avg,
    sm."machineId"
FROM 
    "ProductionSMV" p
JOIN 
    "ObbOperation" o ON p."obbOperationId" = o.id
JOIN 
    "Operation" op ON o."operationId" = op.id
inner JOIN "SewingMachine" sm ON sm."id"= o."sewingMachineId"
WHERE 
    o."obbSheetId" = ${obbSheetId}
    AND p.timestamp like ${datef}
group by  o.smv,
    op.name,
    o."seqNo",
    sm."machineId" 
ORDER BY 
     o."seqNo" ASC;`
  console.log("SMV Data",smv)

  return new Promise((resolve) => resolve(smv as SMVChartData[] ))
}

export async function getDefects(obbsheetid:string,date:string) {
    
    const sql = neon(process.env.DATABASE_URL || "");
  

  
  
  const smv = await sql`SELECT
count(pd) as count,

    pd."qcStatus",
    
    d."name",
    pd."part"
 
    
    
FROM 
    "ProductDefect" pd
    
inner JOIN
    "_ProductQC" pq ON pq."B" = pd.id
inner JOIN
    "Defect" d ON d.id = pq."A"

WHERE
   
    pd."qcStatus" <> 'pass' 
    AND pd."obbSheetId" ='m0uk89ef-wleHBGo6tNxf'
    AND pd."timestamp" like '2024-09-10%'
  
GROUP BY
    pd."qcStatus",d."name",pd."part"
    
union

SELECT
count(gd) as count,

    gd."qcStatus", 

    d."name",
    gd."part"
    
    
FROM 
    "GmtDefect" gd
inner JOIN
    "_GmtQC" gdd ON gdd."B" = gd.id
inner JOIN
    "Defect" d ON d.id = gdd."A"
WHERE
   
    gd."qcStatus" <> 'pass' 
    AND gd."obbSheetId" = ${obbsheetid}
    AND gd."timestamp" like ${date}
  
GROUP BY
    d.name,gd."qcStatus",gd."part"


    `
    //order by count desc
   // console.log("SMV Data",smv)
    return new Promise((resolve) => resolve(smv as SMVChartData[] ))
  }

  //m0uk89ef-wleHBGo6tNxf'
  //'2024-09-10%'
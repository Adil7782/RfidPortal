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

export async function getDefects() {
    
    const sql = neon(process.env.DATABASE_URL || "");
  

  
  
  const smv = await sql`SELECT 
count(gd) as count,

    gd."qcStatus", 

    d."name"
    
FROM 
    "GmtDefect" gd
inner JOIN
    "_GmtQC" gdd ON gdd."B" = gd.id
inner JOIN
    "Defect" d ON d.id = gdd."A"
WHERE
   
    gd."qcStatus" <> 'pass'
  
GROUP BY
    d.name,gd."qcStatus"
    
order by count desc
limit 5
`
    console.log("SMV Data",smv)
  
    return new Promise((resolve) => resolve(smv as SMVChartData[] ))
  }
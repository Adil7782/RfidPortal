"use server"
import { SMVChartData } from "@/app/admin/top-five/_components/analytics-chart";
import { neon } from "@neondatabase/serverless";
import { QualityControlIssue } from "./smv-bar-chart";
// import { SMVChartData } from "./analytics-chart";

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

export async function getDefects(obbsheetid:string,date:string,partArea:string):Promise<QualityControlIssue[]> {
    
    const sql = neon(process.env.DATABASE_URL || "");
  

  
  
  const smv = await sql`
  WITH CombinedDefects AS (
  SELECT
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
    AND pd."obbSheetId" = ${obbsheetid}
    AND pd."timestamp" like ${date}
    AND pd."part" = ${partArea}
  
  
GROUP BY
    pd."qcStatus",d."name",pd."part"
    
union all

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
    AND gd."part" = ${partArea}
  
GROUP BY
    d.name,gd."qcStatus",gd."part"

)
    SELECT * 
FROM CombinedDefects
ORDER BY count DESC
LIMIT 5;


    `
    //order by count desc
   // console.log("SMV Data",smv)
    return new Promise((resolve) => resolve(smv as QualityControlIssue[] ))
  }

  export async function getDefectsLine(obbsheetid:string,date:string) :Promise<QualityControlIssue[]>{
    
    const sql = neon(process.env.DATABASE_URL || "");
  console.log(".")

  
  
  const smv = await sql` WITH CombinedDefects AS (
  SELECT
count(pd) as count,

    pd."qcStatus",
    
    d."name",
    pd."part",
    pd."obbSheetId"
 
    
    
FROM 
    "ProductDefect" pd
    
inner JOIN
    "_ProductQC" pq ON pq."B" = pd.id
inner JOIN
    "Defect" d ON d.id = pq."A"

WHERE
   
    pd."qcStatus" <> 'pass' 
   
   
 
  
  
GROUP BY
    pd."qcStatus",d."name",pd."part",pd."obbSheetId"
 
    
union all

SELECT
count(gd) as count,

    gd."qcStatus", 

    d."name",
    gd."part",
    gd."obbSheetId"
 
    
    
FROM 
    "GmtDefect" gd
inner JOIN
    "_GmtQC" gdd ON gdd."B" = gd.id
inner JOIN
    "Defect" d ON d.id = gdd."A"
WHERE
   
    gd."qcStatus" <> 'pass' 
   


  
GROUP BY
    d.name,gd."qcStatus",gd."part",gd."obbSheetId"
 

)
    SELECT * 
FROM CombinedDefects
ORDER BY count DESC



    `
    //order by count desc
   // console.log("SMV Data",smv)
    return new Promise((resolve) => resolve(smv as QualityControlIssue[] ))
  }



  
  //m0uk89ef-wleHBGo6tNxf'
  //'2024-09-10%'
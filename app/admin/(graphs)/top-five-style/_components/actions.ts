"use server"
import { neon } from "@neondatabase/serverless";
import { SMVChartData } from "./analytics-chart";



export async function getDefects(obbsheetid:string,date:string,partArea:string) {
    
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
    return new Promise((resolve) => resolve(smv as SMVChartData[] ))
  }


  export async function getDefectsLine(obbsheetid:string,date:string) {
    
    const sql = neon(process.env.DATABASE_URL || "");
  console.log(".")

  
  
  const smv = await sql` WITH CombinedDefects AS (
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
    return new Promise((resolve) => resolve(smv as SMVChartData[] ))
  }
  //m0uk89ef-wleHBGo6tNxf'
  //'2024-09-10%'
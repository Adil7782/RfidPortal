"use server"
import { neon } from "@neondatabase/serverless";
import { defectsData } from "./all-defect-chart";


export async function getDefects(obbsheetid:string,date:string):Promise<defectsData[]> {

    
    const sql = neon(process.env.DATABASE_URL || "");
  

  
  
  const data = await sql`select 
  count(pd.id) as defectcount,
  d.name
    from "ProductDefect" pd
left join  "_ProductQC" pqc ON pqc."B" = pd.id
left join "Defect" d ON d.id = pqc."A"
where pd."qcStatus"<>'pass'
group by d.name


UNION

select 
  count(gd.id) as defectcount,
  d.name
    from "GmtDefect" gd
left join  "_GmtQC" gqc ON gqc."B" = gd.id
left join "Defect" d ON d.id = gqc."A"
where gd."qcStatus"<>'pass'
group by d.name `
 
console.log("defect Data",data)

   
   return new Promise((resolve) => resolve(data as defectsData[] ))
  }
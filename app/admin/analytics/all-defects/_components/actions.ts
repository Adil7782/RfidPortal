"use server";
import { neon } from "@neondatabase/serverless";
import { defectsData } from "./all-defect-chart";

export async function getDefects(obbsheetid: string, date: string,partArea:string): Promise<defectsData[]> {
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
      and pd.part=${partArea}
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
      and gd.part=${partArea}
    group by d.name,     gd.part
  `;

  console.log("defect Data", data);

  return new Promise((resolve) => resolve(data as defectsData[]));
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

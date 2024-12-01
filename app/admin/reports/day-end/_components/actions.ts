"use server";
import { neon } from "@neondatabase/serverless";


export type defData  = {
    reduce(arg0: (total: any, item: any) => any, arg1: number): import("react").ReactNode;
    map(arg0: (dataItem: any, dataIndex: any) => import("react").JSX.Element): import("react").ReactNode;
    count:number;
    name:string;
    part:string
    obbid:string
}


export async function getProdDefect(obbsheetid:string,date:string) : Promise<defData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data =
       await sql`select count(pd."productId") as count,d.name,part,"obbSheetId" obbid from "ProductDefect" pd
LEFT JOIN
    "_ProductQC" gdd ON gdd."B" = pd.id
LEFT JOIN
    "Defect" d ON d.id = gdd."A"
where timestamp like ${date+"%"} and "qcStatus" <> 'pass' and "obbSheetId" = ${obbsheetid}
GROUP BY d.name,part,"obbSheetId"
order by count desc
;
`;
    
    
    return new Promise((resolve) => resolve(data as defData[] ))
}


export async function getGmtDefect(obbsheetid:string,date:string) : Promise<defData[]>   {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`SELECT 
   count(gd."gmtId") as count,d.name,part,"obbSheetId" obbid
FROM 
    "GmtDefect" gd
LEFT JOIN
    "_GmtQC" gdd ON gdd."B" = gd.id
LEFT JOIN
    "Defect" d ON d.id = gdd."A"
    
where timestamp like ${date+"%"} and "qcStatus" <> 'pass' and "obbSheetId" = ${obbsheetid}
group by part,name,"obbSheetId"
order by count desc
;
`
    
    
    return new Promise((resolve) => resolve(data as defData[] ))
}
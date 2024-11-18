"use server";
import { neon } from "@neondatabase/serverless";


export type ProductDefect = {
    id: string;
    createdAt: Date;
    obbSheetId: string | null;
    timestamp: string;
    productId: string;
    qcStatus: string;
    qcPointId: string;
    obbOperationId: string | null;
    operatorId: string | null;
    operatorName: string | null;
    part: string;
}

export async function getUnit() : Promise<{ id: string; name: string }[]>  {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    
     const data = await sql`
     select id as id , name as name from "Unit" u 


 order by "createdAt" desc

`
    return new Promise((resolve) => resolve(data as { id: string; name: string }[]))
}

export async function getCount() : Promise<ProductDefect[]>  {
    const sql = neon(process.env.DATABASE_URL || "");

    
     const data = await sql`
     select * from "ProductDefect" 
where timestamp like '2024-11-18%'


`
    return new Promise((resolve) => resolve(data as ProductDefect[]))
}

"use server";
import { neon } from "@neondatabase/serverless";
// import { ProductionDataType } from "./components/analytics-chart";

export async function getUnits()    {
    const sql = neon(process.env.ELIOT_DATABASE_URL || "");

    const data = await sql`select id, name from "Unit" 
    order by "createdAt" asc`;

  
  
 
    return new Promise((resolve) => resolve(data as { id: string; name: string }[]))
}

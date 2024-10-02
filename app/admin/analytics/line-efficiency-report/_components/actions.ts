"use server"
import { neon } from "@neondatabase/serverless";


export async function getData(obbSheetId:string,date:string,line:string,unit:string):Promise<any[]>{

    const sql = neon(process.env.ELIOT_DATABASE_URL || "");
    console.log("ObbsheetId",obbSheetId)
    console.log("Date",date)
    console.log("line",line)
    console.log("unit",unit)
  const formatedadte=`${date}%`
    const data=await sql`
    select 
SUM(pd."productionCount") AS "productionCount",
EXTRACT(hour FROM pd.timestamp::TIMESTAMP) AS hour,
obbop.target,
obbop.id obboperationid,
pl.id as LineId,
pl.name as linename,
un.name as unit
from 
"ProductionData" pd
inner join "ObbOperation" obbop on obbop.id=pd."obbOperationId"
inner join "ObbSheet" obs on obs.id=obbop."obbSheetId"
inner join "ProductionLine" pl on pl.id=obs."productionLineId"
inner join "Unit" un on un.id=pl."unitId"
where obs.id=${obbSheetId} AND  pd.timestamp::TEXT LIKE ${formatedadte} 
group by hour,obbop.target,obbop.id,pl.id,pl.name,un.name
  having  sum(pd."productionCount")<>0
  order by  hour`;
    
   
   
  console.log(" Data",data)
  return new Promise((resolve) => resolve(data as any[]))

}
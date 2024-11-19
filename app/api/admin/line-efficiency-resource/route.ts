import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";



type LineEfficiencyResources = {
  id?: string;
  unitName?: string;
  obbSheetId?: string;
  style?: string;
  frontQcTarget?: number | null;
  backQcTarget?: number | null;
  endQcTarget?: number | null;
  workingHours?: number | null;
  totalSMV?: number | null;
  targetEfficiency?: number | null;
  date?: string | null;
  lineName?: string | null;
  dailyPlanEfficiency?: number | null;
  obbHelpers?: number | null;
  obbIronOperators?: number | null;
  obbManPowers?: number | null;
  obbSewingOperators?: number | null;
  targetWorkingHours?: number | null;
  utilizedHelpers?: number | null;
  utilizedIronOperators?: number | null;
  utilizedMachines?: number | null;
  utilizedManPowers?: number | null;
  utilizedSewingOperators?: number | null;
};

export async function POST(
    req: Request,
) {
    try {
        const {
          unitName,
          lineName,
          style,
          obbSheetId,
          date,
          utilizedSewingOperators,
          utilizedIronOperators,
          utilizedHelpers,
          utilizedManPowers,
          obbSewingOperators,
          obbIronOperators,
          obbHelpers,
          obbManPowers,
          frontQcTarget,
          backQcTarget,
          endQcTarget,
          workingHours,
          targetWorkingHours,
          totalSMV,
          targetEfficiency,
          utilizedMachines,
        //   dailyPlanEfficiency,
        } = await req.json();

        let id = generateUniqueId();
        
        console.log("backend",unitName, lineName, style, obbSheetId, date, utilizedSewingOperators, utilizedIronOperators, utilizedHelpers, utilizedManPowers, obbSewingOperators, obbIronOperators, obbHelpers, obbManPowers, frontQcTarget, backQcTarget, endQcTarget, workingHours, targetWorkingHours, totalSMV, targetEfficiency, utilizedMachines)
        console.log("jkhnjahnjshdajsdhajdbj",id)

        const existingRecord = await db.lineEfficiencyResources.count({
            where: {
                date
            }
        });

        if (existingRecord > 0) {
            return new NextResponse("Line efficiency was recorded for today", { status: 409 })
        }

        await db.lineEfficiencyResources.create({
            data: {
                unitName,
          lineName,
          style,
          obbSheetId,
          date,
          utilizedSewingOperators,
          utilizedIronOperators,
          utilizedHelpers,
          utilizedManPowers,
          obbSewingOperators,
          obbIronOperators,
          obbHelpers,
          obbManPowers,
          frontQcTarget,
          backQcTarget,
          endQcTarget,
          workingHours,
          targetWorkingHours,
          totalSMV,
          targetEfficiency,
          utilizedMachines,
        //   dailyPlanEfficiency,
            }
        });

        return new NextResponse("Created new line efficiency record", { status: 201 });

    } catch (error) {
        console.error("[ELIOT_DEVICE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function GET(req: Request) :Promise<NextResponse>{
    try {
        // Parse the query parameters from the URL
        const { searchParams } = new URL(req.url);
        const obbSheetId = searchParams.get("obbSheetId");
        const date = searchParams.get("date");

        if (!obbSheetId || !date) {
            return new NextResponse("unitName and date are required", { status: 400 });
        }

        // Query the database to find the matching record
        const record = await db.lineEfficiencyResources.findFirst({
            where: {
                obbSheetId,
                date,
            },
        });

        if (!record) {
            return new NextResponse("No record found for the provided unitName and date", { status: 404 });
        }

        // Return the record as a JSON response


        console.log("res",record)
        return NextResponse.json(record);
    } catch (error) {
        console.error("[LINE_EFFICIENCY_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {


        const {
            unitName,
            lineName,
            style,obbSheetId,date,
           
            utilizedSewingOperators,
            utilizedIronOperators,
            utilizedHelpers,
            utilizedManPowers,
            obbSewingOperators,
            obbIronOperators,
            obbHelpers,
            obbManPowers,
            frontQcTarget,
            backQcTarget,
            endQcTarget,
            workingHours,
            targetWorkingHours,
            totalSMV,
            targetEfficiency,
            utilizedMachines,
          //   dailyPlanEfficiency,
          } = await req.json();

        // Parse the query parameters from the URL

        

        console.log("first",obbSheetId,date)
        
        if (!obbSheetId || !date) {
            return new NextResponse("Obb Sheet and date are required", { status: 400 });
        }

        // Query the database to find the matching record
        const record = await db.lineEfficiencyResources.findFirst({
            where: {
                obbSheetId,
                date,
            },
        });

        if (!record) {
            return new NextResponse("No record found for the provided Obb Sheet and date", { status: 404 });
        }

        // Return the record as a JSON response

        const updatedSheet = await db.lineEfficiencyResources.update({
            where:{
                id: record.id,
            },
            data:{
                unitName,
            lineName,
            style,
           date,
            utilizedSewingOperators,
            utilizedIronOperators,
            utilizedHelpers,
            utilizedManPowers,
            obbSewingOperators,
            obbIronOperators,
            obbHelpers,
            obbManPowers,
            frontQcTarget,
            backQcTarget,
            endQcTarget,
            workingHours,
            targetWorkingHours,
            totalSMV,
            targetEfficiency,
            utilizedMachines,
            }
        })

        console.log("res",record)
        return NextResponse.json(updatedSheet);
    } catch (error) {
        console.error("[LINE_EFFICIENCY_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
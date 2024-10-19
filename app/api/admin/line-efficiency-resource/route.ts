import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateUniqueId } from "@/actions/generate-unique-id";

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
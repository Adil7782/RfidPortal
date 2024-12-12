import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const { obbSheetId } = body;

        const existingPoint = await db.obbQcTarget.findUnique({
            where: {
                obbSheetId
            }
        });

        if (existingPoint) {
            await db.obbQcTarget.update({
                where: {
                    obbSheetId
                },
                data: {
                   ...body
                }
            });
            
            return new NextResponse("OBB QC target updated successfully", { status: 200 });
        } else {
            await db.obbQcTarget.create({
                data: {
                    ...body
                }
            });

            return new NextResponse("New OBB QC target successfully", { status: 201 });
        }
    } catch (error) {
        console.error("[OBB_QC_TARGET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
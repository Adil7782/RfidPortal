"use server";

import { Defect } from "@prisma/client";

import { db } from "@/lib/db";

export async function fetchQcDefectsForQcPoint(qcPointId:string) : Promise<Defect[]>   {
    try {
        const data = await db.defect.findMany({
            where: {
                qcPoint: {
                    id: qcPointId
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return new Promise((resolve) => resolve(data as Defect[] ));
    } catch (error) {
        console.error("[FETCH_QC_DEFECTS_ERROR]", error);
        return [];
    }
}
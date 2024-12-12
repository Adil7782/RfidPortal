"use server";

import { db } from "@/lib/db";

export async function deleteQcDefect(defectId:string) : Promise<string>   {
    try {
        await db.defect.delete({
            where: {
                id: defectId
            }
        });
        
        return "QC defect deleted successfully"
    } catch (error) {
        console.error("[DELETE_QC_DEFECTS_ERROR]", error);
        return "Something went wrong, please try again";
    }
}
"use server";

import { GmtData, Product, Rfid } from "@prisma/client";

import { db } from "@/lib/db";

type AssembledProductsDataProps = (Product & {
    frontGmt: GmtData;
    rfid: Rfid;
})[];

export async function fetchAssembledProductsData(obbSheetId: string, date:string) : Promise<AssembledProductsDataProps>   {
    try {
        const products = await db.product.findMany({
            where: {
                obbSheetId,
                timestampAssembled: {
                    gte: `${date} 00:00:00`,
                    lte: `${date} 23:59:59`,
                }
            },
            include: {
                frontGmt: true,
                rfid: true
            }
        });
        
        return new Promise((resolve) => resolve(products as AssembledProductsDataProps ));
    } catch (error) {
        console.error("[FETCH_ASSEMBLED_PRODUCTS_FOR_REPORT_ERROR]", error);
        return [];
    }
}
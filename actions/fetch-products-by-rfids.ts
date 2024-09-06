"use server";

import { neon } from "@neondatabase/serverless";
import { db } from "@/lib/db";

export async function fetchProductsByRfids( rfids: string[] ): Promise<ProductDataForRFIDType[]> {
    const sql = neon(process.env.DATABASE_URL || "");

    try {
        const data = await db.product.findMany({
            where: {
                rfid: {
                    rfid: {
                        in: rfids
                    }
                }
            },
            select: {
                id: true,
                rfid: {
                    select: {
                        rfid: true
                    }
                },
                frontGmt: {
                    select: {
                        shade: true,
                        color: true,
                        size: true,
                        styleNo: true
                    }
                }
            }
        });

        const formattedData: ProductDataForRFIDType[] = data.map(product => ({
            id: product.id,
            rfid: product.rfid.rfid,
            shade: product.frontGmt.shade,
            color: product.frontGmt.color,
            size: product.frontGmt.size,
            styleNo: product.frontGmt.styleNo,
        }));

        // const data = await sql`
        //     SELECT 
        //         p.id,
        //         r.rfid,
        //         fg.shade,
        //         fg.color,
        //         fg.size,
        //         fg."styleNo"
        //     FROM 
        //         "Product" p
        //     INNER JOIN 
        //         "Rfid" r ON p."rfidId" = r.id
        //     LEFT JOIN 
        //         "GmtData" fg ON p."frontGmtId" = fg.id
        //     WHERE 
        //         r.rfid IN ('e28069150000401e4335b5fa', 'e28069150000401e43365e1e', 'e28069150000401e4395be38')
        //     ORDER BY 
        //         p."createdAt";`;
        
        return new Promise((resolve) => resolve(formattedData as ProductDataForRFIDType[]));
    } catch (error: any) {
        console.error("[FETCH_PRODUCT_DETAILS_ERROR]", error);
        return [];
    }
}
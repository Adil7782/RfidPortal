"use server"

import { db } from "@/lib/db";

export async function fetchProductByRfid( rfid: string ): Promise<ProductDataForRFIDType | null> {
    try {
        const productData = await db.product.findMany({
            where: {
                rfid: {
                    rfid: rfid
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
                        styleNo: true,
                        buyerName: true
                    }
                },
                finishingLine: true
            }
        });

        const data: ProductDataForRFIDType = {
            id: productData[0].id,
            rfid: productData[0].rfid.rfid,
            shade: productData[0].frontGmt.shade,
            color: productData[0].frontGmt.color,
            size: productData[0].frontGmt.size,
            styleNo: productData[0].frontGmt.styleNo,
            buyerName: productData[0].frontGmt.buyerName,
            fline: productData[0].finishingLine
        }
        
        return new Promise((resolve) => resolve(data as ProductDataForRFIDType));
    } catch (error: any) {
        console.error("[FETCH_PRODUCT_DETAILS_ERROR]", error);
        return null;
    }
}
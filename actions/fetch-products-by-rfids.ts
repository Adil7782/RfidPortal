"use server";

import { db } from "@/lib/db";

export async function fetchProductsByRfids( rfids: string[] ): Promise<ProductDataForRFIDType[]> {
    try {
        const data = await db.product.findMany({
            where: {
                rfid: {
                    rfid: {
                        in: rfids
                    },
                    isActive: true
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
            buyerName: product.frontGmt.buyerName,
        }));
        
        return new Promise((resolve) => resolve(formattedData as ProductDataForRFIDType[]));
    } catch (error: any) {
        console.error("[FETCH_PRODUCT_DETAILS_ERROR]", error);
        return [];
    }
}
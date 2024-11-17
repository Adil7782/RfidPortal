"use server"

import { Product, ProductDefect } from "@prisma/client";

import { db } from "@/lib/db";

type ProductDataForTrackGarmentResponseTypes = {
    status: number;
    message: string;
    data: {
        product: Product;
        qc: ProductDefect[];
    } | null;
}

export async function fetchProductForTrackGarment(rfid: string): Promise<ProductDataForTrackGarmentResponseTypes> {
    try {
        const productData = await db.product.findFirst({
            where: {
                rfid: {
                    rfid: rfid
                }
            }
        });

        if (!productData) {
            return {
                status: 409,
                message: "RFID is not found from the database, Please try again later.",
                data: null
            };
        };

        const formattedData = {
            status: 200,
            message: "Product fetched successfully",
            data: {
                product: productData,
                qc: await db.productDefect.findMany({
                    where: {
                        productId: productData.id
                    }
                })
            }
        };

        return new Promise((resolve) => resolve(formattedData as ProductDataForTrackGarmentResponseTypes));
    } catch (error: any) {
        console.error("[FETCH_GARMENT_DETAILS_ERROR]", error);
        return {
            status: 500,
            message: "Failed to fetch product details, Please try again.",
            data: null
        };
    }
}
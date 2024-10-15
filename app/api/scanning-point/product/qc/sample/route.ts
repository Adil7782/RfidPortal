import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
    req: Request,
) {
    try {
        const products = await db.product.findMany({
            where: {
                timestampAssembleQc: {
                    not: null
                }
            }
        });
        
        for (const product of products) {
            await db.product.update({
                where: {
                    id: product.id,
                },
                data: {
                    timestampEndQc: product.timestampAssembleQc
                },
            });
        }

        return new NextResponse("Updated successfully", { status: 201 });
    } catch (error) {
        console.error("[SAMPLE_PRODUCT_QC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
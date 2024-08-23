"use server"

import { db } from "@/lib/db";

export async function fetchBundleDataFromDB( qrCode: string ): Promise<SchemaBundleDataType | null> {
    try {
        const bundleData = await db.bundleData.findUnique({
            where: {
                bundleBarcode: parseInt(qrCode)
            }
        });
        
        return new Promise((resolve) => resolve(bundleData as SchemaBundleDataType));
    } catch (error: any) {
        console.error("[FETCH_BUNDLE_DATA_FROM_SERVER_ERROR]", error);
        return null;
    }
}
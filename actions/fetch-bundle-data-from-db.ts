"use server"

import { db } from "@/lib/db";

type FunctionReturnType = {
    status: number;
    data: SchemaBundleDataType | null;
    style: string;
}

export async function fetchBundleDataFromDB( qrCode: string ): Promise<FunctionReturnType> {
    try {
        const bundleData = await db.bundleData.findUnique({
            where: {
                bundleBarcode: parseInt(qrCode)
            }
        });

        const gmtdata = await db.gmtData.findFirst({
            where: {
                bundle: {
                    bundleBarcode: parseInt(qrCode)
                }
            },
            select: {
                styleNo: true
            }
        });

        if (!bundleData) {
            return { status: 200, data: null, style: "" };
        } 

        if (bundleData.timestampStoreOut) {
            return { status: 409, data: null, style: "" };
        } else {
            return { status: 200, data: bundleData, style: gmtdata?.styleNo || "" };
        }

    } catch (error: any) {
        console.error("[FETCH_BUNDLE_DATA_FROM_SERVER_ERROR]", error);
        return { status: 500, data: null, style: "" };
    }
}
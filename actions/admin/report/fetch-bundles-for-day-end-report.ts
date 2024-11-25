"use server";

import { db } from "@/lib/db";

export async function fetchBundlesForDayEndReport(date:string, pointNo: number) : Promise<FetchBundlesForDayEndReportReturnType[]>   {
    try {
        const timestamp = pointNo === 1 ? "timestampStoreIn" : "timestampStoreOut";

        const data = await db.bundleData.findMany({
            where: {
                [timestamp]: { startsWith: date }
            },
            include: {
                gmtData: {
                    select: {
                        shade: true,
                        styleNo: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const formattedData: FetchBundlesForDayEndReportReturnType[] = data.map(bundle => ({
            id: bundle.id,
            type: pointNo === 1 ? "store-in" : "store-out",
            bundleBarcode: bundle.bundleBarcode,
            color: bundle.color,
            cuttingNo: bundle.cuttingNo,
            buyerName: bundle.buyerName,
            timestamp: pointNo === 1 ? bundle.timestampStoreIn : bundle.timestampStoreOut ?? "",
            style: bundle.gmtData[0].styleNo,
            shade: bundle.gmtData[0].shade,
            garmentQty: bundle.quantity,
        }));
        
        return new Promise((resolve) => resolve(formattedData as FetchBundlesForDayEndReportReturnType[] ));
    } catch (error) {
        console.error("[FETCH_BUNDLE_FOR_REPORT_ERROR]", error);
        return [];
    }
}
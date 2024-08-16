"use server"

import moment from "moment-timezone";
import { neon } from "@neondatabase/serverless";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function storeBundleDataUsingQuery( bundleData: BundleDataType, userEmail: string ): Promise<StoreBundleFunctionResponseType> {
    const sql = neon(process.env.DATABASE_URL || "");
    const bundleId = generateUniqueId();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    
    const gmtData: GarmentDataType[] = bundleData.garments;

    try {
        const existingBundle: any = await sql`SELECT id FROM "BundleData" WHERE "bundleBarcode" = ${parseInt(bundleData.bundleBarcode)}`;
        if (existingBundle.count > 0) {
            return {
                success: false,
                message: "Bundle already exists!",
                status: 409
            };
        }

        const formattedGmtData = gmtData.map(garment => ({
            id: generateUniqueId(),
            bundleId: bundleId,
            ...garment
        }));

        await sql`INSERT INTO "BundleData" (
            "id", "bundleBarcode", "bundleNo", "color", "quantity", "startPly", "endPly", "cuttingNo", "cuttingDate",
            "size", "buyerName", "patternNo", "poCode", "userEmail", "timestampStoreIn"
        ) VALUES (
            ${bundleId}, ${parseInt(bundleData.bundleBarcode)}, ${parseInt(bundleData.bundleNo)}, ${bundleData.color}, ${parseInt(bundleData.quantity)},
            ${parseInt(bundleData.startPly)}, ${parseInt(bundleData.endPly)}, ${parseInt(bundleData.cuttingNo)}, ${bundleData.cuttingDate},
            ${bundleData.size}, ${bundleData.buyerName}, ${bundleData.patternNo || ""}, ${bundleData.po ? bundleData.po.map(po => po.poCode) : []}, ${userEmail}, ${timestamp}
        )`;

        const garmentInsertQuery = `INSERT INTO "GmtData" ("id", "bundleId", "gmtBarcode", "color", "shade", "size", "styleNo", "buyerName", "partName", "serialNumber") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        for (const garment of bundleData.garments) {
            await sql(garmentInsertQuery, [generateUniqueId(), bundleId, garment.gmtBarcode, garment.color, garment.shade, garment.size, garment.styleNo, garment.buyerName, garment.partName, garment.serialNumber]);
        }

        return {
            success: true,
            message: "Bundle and garment data saved successfully!",
            status: 201
        };
    } catch (error) {
        console.error("[BUNDLE_GMT_DATA_ERROR]", error);
        return {
            success: false,
            message: "Failed to store bundle and garment data.",
            status: 500
        };
    }
}
"use server"

import moment from "moment-timezone";

import { generateUniqueId } from "@/actions/generate-unique-id";
import { db } from "@/lib/db";

export async function storeBundleData( bundleData: BundleDataType, userEmail: string ): Promise<StoreBundleFunctionResponseType> {
    const bundleId = generateUniqueId();

    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const timestamp = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    
    const gmtData: GarmentDataType[] = bundleData.garments;

    try {
        const existingBundle = await db.bundleData.findUnique({
            where: {
                bundleBarcode: parseInt(bundleData.bundleBarcode)
            }
        });

        if (existingBundle) {
            return {
                success: false,
                message: "Bundle is already exist!",
                status: 409
            }
        };

        const formattedGmtData = gmtData.map(garment => ({
            id: generateUniqueId(),
            bundleId: bundleId,
            ...garment
        }));

        await db.bundleData.create({
            data: {
                id: bundleId,
                bundleBarcode: parseInt(bundleData.bundleBarcode),
                bundleNo: parseInt(bundleData.bundleNo),
                color: bundleData.color,
                quantity: parseInt(bundleData.quantity),
                startPly: parseInt(bundleData.startPly),
                endPly: parseInt(bundleData.endPly),
                cuttingNo: parseInt(bundleData.cuttingNo),
                cuttingDate: bundleData.cuttingDate,
                size: bundleData.size,
                buyerName: bundleData.buyerName,
                patternNo: bundleData.patternNo || "",
                poCode: bundleData.po ? bundleData.po.map(po => po.poCode) : [],
                timestampStoreIn: timestamp,
                userEmail: userEmail || "",
            }
        });

        await db.gmtData.createMany({
            data: formattedGmtData
        });

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
"use server";

import { db } from "@/lib/db";
import BarChart from "../analytics/_components/bar-chart";
// import { ScanningPointTypes } from "./types"; // Import your type if needed

// Function to calculate hourly targets
function calculateHourlyTargets(point: any[]): (number | null)[] {
    return point.map(point =>
        (point.dailyTarget && point.workingHours)
            ? point.dailyTarget / point.workingHours
            : null
    );
}

// Server-side function to get the data
export const getData = async (passeddate:any) => {
    // const date = new Date();
    // const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';
    // const today = new Date().toLocaleDateString('en-CA', { timeZone: timezone }); 
    // const startDate = `${today} 00:00:00`;
    // const endDate = `${today} 23:59:59`;

    const date = new Date(passeddate);
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';
    const today = date.toLocaleDateString('en-CA', { timeZone: timezone }); 
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    // Fetching scanning point data
    const pointData = await db.scanningPoint.findMany({
        select: {
            name: true,
            dailyTarget: true,
            workingHours: true,
        },
        orderBy: {
            pointNo: "asc",
        },
    });

    // Fetching counts for various parts
    const cuttingInCount = await db.bundleData.count({
        where: {
            timestampStoreIn: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const cuttingOutCount = await db.bundleData.count({
        where: {
            timestampStoreOut: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const frontGmtCount = await db.gmtData.count({
        where: {
            partName: "FRONT",
            timestampProduction: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const backGmtCount = await db.gmtData.count({
        where: {
            partName: "BACK",
            timestampProduction: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const frontGmtQcCount = await db.gmtDefect.count({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate,
            },
            gmtData: {
                partName: "FRONT",
            },
        },
    });

    const backGmtQcCount = await db.gmtDefect.count({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate,
            },
            gmtData: {
                partName: "BACK",
            },
        },
    });

    const productAssembleCount = await db.product.count({
        where: {
            timestampAssembled: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const productAssembleQcCount = await db.product.count({
        where: {
            timestampAssembleQc: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    // Calculate hourly targets
    const updatedData = calculateHourlyTargets(pointData);

    // Return all values
    return {
        hourlyTarget: updatedData,
        cuttingInCount,
        cuttingOutCount,
        frontGmtCount,
        backGmtCount,
        frontGmtQcCount,
        backGmtQcCount,
        productAssembleCount,
        productAssembleQcCount
    };
}

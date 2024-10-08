import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Ensure this path correctly points to your Prisma client instance
import moment from 'moment-timezone';

export async function GET(request: Request) {
    try {
        // Extract the date from the query parameters
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date'); // Get the 'date' query parameter
        const date = dateParam ? new Date(dateParam) : new Date(); // Use provided date or current date
        
        const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';
        const today = moment(date).tz(timezone).format('YYYY-MM-DD');
        const startDate = `${today} 00:00:00`;
        const endDate = `${today} 23:59:59`;
        console.log("first",dateParam)

        // Fetch scanning point data
        const pointData = await db.scanningPoint.findMany({
            select: {
                name: true,
                dailyTarget: true,
                workingHours: true,
            },
            orderBy: {
                pointNo: 'asc',
            },
        });

        // Perform necessary counts
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
                partName: 'FRONT',
                timestampProduction: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const backGmtCount = await db.gmtData.count({
            where: {
                partName: 'BACK',
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
                    partName: 'FRONT',
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
                    partName: 'BACK',
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

        // Return the fetched data as JSON
        return NextResponse.json({
            pointData,
            cuttingInCount,
            cuttingOutCount,
            frontGmtCount,
            backGmtCount,
            frontGmtQcCount,
            backGmtQcCount,
            productAssembleCount,
            productAssembleQcCount,
        });
    } catch (error) {
        console.error("Error fetching chart data:", error);
        return NextResponse.error(); // Return an error response
    }
}

import moment from "moment-timezone";

import { db } from "@/lib/db";
import BarChart from "./bar-chart";

interface ScanningPointTypes {
    name: string;
    dailyTarget: number | null;
    workingHours: number | null;
}
    
function calculateHourlyTargets(point: ScanningPointTypes[]): (number | null)[] {
    return point.map(point =>
        (point.dailyTarget && point.workingHours) 
            ? point.dailyTarget / point.workingHours
            : null
    );
}

const TargetChartComponent = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    const pointData = await db.scanningPoint.findMany({
        select: {
            name: true,
            dailyTarget: true,
            workingHours: true,
        },
        orderBy: {
            pointNo: "asc",
        }
    });

    const cuttingInCount = await db.bundleData.count({
        where: {
            timestampStoreIn: {
                gte: startDate,
                lte: endDate
            }
        }
    });
    const cuttingOutCount = await db.bundleData.count({
        where: {
            timestampStoreOut: {
                gte: startDate,
                lte: endDate
            }
        }
    });

    const frontGmtCount = await db.gmtData.count({
        where: {
            partName: "FRONT",
            timestampProduction: {
                gte: startDate,
                lte: endDate
            }
        }
    });
    const backGmtCount = await db.gmtData.count({
        where: {
            partName: "BACK",
            timestampProduction: {
                gte: startDate,
                lte: endDate
            }
        }
    });

    const frontGmtQcCount = await db.gmtDefect.count({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate
            },
            gmt: {
                partName: "FRONT"
            }
        }
    });
    const backGmtQcCount = await db.gmtDefect.count({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate
            },
            gmt: {
                partName: "BACK"
            }
        }
    });

    const productAssembleCount = await db.product.count({
        where: {
            timestampAssembled: {
                gte: startDate,
                lte: endDate
            }
        }
    });
    const productAssembleQcCount = await db.product.count({
        where: {
            timestampAssembleQc: {
                gte: startDate,
                lte: endDate
            }
        }
    });
    
    const updatedData = calculateHourlyTargets(pointData);
    
    return (
        <BarChart 
            hourlyTarget={updatedData}
            cuttingInCount={cuttingInCount}
            cuttingOutCount={cuttingOutCount}
            frontGmtCount={frontGmtCount}
            backGmtCount={backGmtCount}
            frontGmtQcCount={frontGmtQcCount}
            backGmtQcCount={backGmtQcCount}
            productAssembleCount={productAssembleCount}
            productAssembleQcCount={productAssembleQcCount}
        />
    )
}

export default TargetChartComponent
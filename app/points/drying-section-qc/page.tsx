import moment from "moment-timezone";

import { db } from "@/lib/db";
import { calculateDefectCounts } from "@/actions/calculate-defect-counts";
import { calculateDhuAndAcv } from "@/actions/calculate-dhu-acv";
import QCDashboardPanel from "@/components/scanning-point/qc-dashboard-panel";

const ScanningPoint10Page = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    // Fetch the QC point details
    const qcPoint = await db.scanningPoint.findUnique({
        where: {
            pointNo: 12      // Drying Section QC
        },
        include: {
            defects: true
        }
    });

    let productDefects: ProductDefectTypes[] = [];

    if (qcPoint) {
        // Fetch the defects for the selected date range
        productDefects = await db.productDefect.findMany({
            where: {
                qcPointId: qcPoint?.id,
                timestamp: {
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                id: true,
                qcStatus: true,
                timestamp: true,
                defects: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }
    
    let totalDHUValue: number = 0;
    let hourlyQuantityValues: HourlyQuantityDataTpes[] = [];

    if (productDefects && qcPoint && qcPoint?.workingHours && qcPoint?.dailyTarget) {
        const { totalDHU, hourlyQuantity } = calculateDhuAndAcv(productDefects, qcPoint.workingHours, qcPoint.dailyTarget);
        totalDHUValue = parseFloat(totalDHU.toFixed(1));
        hourlyQuantityValues = hourlyQuantity;
        // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | ACV: ${group.ACV.toFixed(2)}%`));
    }

    return calculateDefectCounts(productDefects)
        .then(results => {
            return (
                <QCDashboardPanel
                    pointNo={12} 
                    defects={qcPoint?.defects}
                    qcPoint={qcPoint}
                    totalStatusCounts={results.totalStatusCounts}
                    currentHourStatusCounts={results.currentHourStatusCounts}
                    totalDHU={totalDHUValue}
                    hourlyQuantity={hourlyQuantityValues}
                />
            );
        }).catch(error => {
            console.error("Error calculating defect counts:", error);
            return <div className="text-center mt-40 text-red-600 text-lg">Error loading QC dashboard data.</div>;
        });
}

export default ScanningPoint10Page
import moment from "moment-timezone";
import { QcSectionTarget } from "@prisma/client";

import { db } from "@/lib/db";
import QCDashboardPanel from "./_components/qc-dashboard-panel";
import { calculateDefectCounts } from "@/actions/calculate-defect-counts";
import { calculateDhuAndAcv } from "@/actions/calculate-dhu-acv";

const ScanningPoint4Page = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    const qcSection = await db.qcSection.findUnique({
        where: {
            name: "GMT Production QC"
        },
        include: {
            defect: true
        }
    });

    let qcTarget: QcSectionTarget[] = [];
    let gmtDefects: GmtDefectTypes[] = [];

    if (qcSection) {
        qcTarget = await db.qcSectionTarget.findMany({
            where: {
                qcSectionId: qcSection?.id,
                date: today
            },
            orderBy: {
                date: "desc",
            },
        });
        
        gmtDefects = await db.gmtDefect.findMany({
            where: {
                qcSectionId: qcSection?.id,
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

    if (gmtDefects && qcTarget[0]) {
        const { totalDHU, hourlyQuantity } = calculateDhuAndAcv(gmtDefects, qcTarget[0].workingHours, qcTarget[0].dailyTarget);
        totalDHUValue = parseFloat(totalDHU.toFixed(1));
        hourlyQuantityValues = hourlyQuantity;
        // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | ACV: ${group.ACV.toFixed(2)}%`));
    }

    return calculateDefectCounts(gmtDefects)
        .then(results => {
            return (
                <QCDashboardPanel 
                    defects={qcSection?.defect}
                    qcTarget={qcTarget[0]}
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

export default ScanningPoint4Page
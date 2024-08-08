import moment from "moment-timezone";
import { QcSectionTarget } from "@prisma/client";

import { db } from "@/lib/db";
import { calculateDefectCounts } from "@/actions/calculate-defect-counts";
import { calculateDhuAndAcv } from "@/actions/calculate-dhu-acv";
import QCDashboardPanel from "@/components/scanning-point/qc-dashboard-panel";

const ScanningPoint15Page = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    const qcSection = await db.qcSection.findUnique({
        where: {
            name: "Finishing Line QC"
        },
        include: {
            defect: true
        }
    });

    let qcTarget: QcSectionTarget | null = null;
    let productDefects: ProductDefectTypes[] = [];

    if (qcSection) {
        qcTarget = await db.qcSectionTarget.findUnique({
            where: {
                qcSectionId: qcSection?.id
            }
        });

        productDefects = await db.productDefect.findMany({
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

    if (productDefects && qcTarget) {
        const { totalDHU, hourlyQuantity } = calculateDhuAndAcv(productDefects, qcTarget.workingHours, qcTarget.dailyTarget);
        totalDHUValue = parseFloat(totalDHU.toFixed(1));
        hourlyQuantityValues = hourlyQuantity;
        // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | ACV: ${group.ACV.toFixed(2)}%`));
    }

    return calculateDefectCounts(productDefects)
        .then(results => {
            return (
                <QCDashboardPanel
                    pointNo={17} 
                    defects={qcSection?.defect}
                    qcTarget={qcTarget}
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

export default ScanningPoint15Page
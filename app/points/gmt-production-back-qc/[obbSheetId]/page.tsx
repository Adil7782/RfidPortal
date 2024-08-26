import moment from "moment-timezone";

import { db } from "@/lib/db";
import { calculateDefectCounts } from "@/actions/qc/gmt/calculate-defect-counts";
import { calculateDhuAndAcv } from "@/actions/qc/gmt/calculate-dhu-acv";
import GmtQCDashboardPanel from "@/components/scanning-point/qc/gmt/gmt-qc-dashboard-panel";

const GmtQCScanningPointPage = async ({
    params
}: {
    params: { obbSheetId: string }
}) => {
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment().tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    // Fetch the QC point details
    const qcPoint = await db.scanningPoint.findUnique({
        where: {
            pointNo: 6      // GMT Production QC - BACK
        },
        include: {
            defects: true
        }
    });

    if (!qcPoint) return <p>QC point not found</p>;

    const gmtDefects = await db.gmtDefect.findMany({
        where: {
            qcPointId: qcPoint?.id,
            timestamp: {
                gte: startDate,
                lte: endDate
            },
            part: "BACK"
        },
        select: {
            id: true,
            gmtId: true,
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
    

    const defectCounts = await calculateDefectCounts(gmtDefects);

    if (!defectCounts) {
        return <p>Failed to calculate defect counts</p>;
    }

    let totalDHUValue: number = 0;
    let hourlyQuantityValues: HourlyQuantityDataTypes[] = [];

    if (qcPoint?.workingHours && qcPoint?.dailyTarget) {
        const { totalDHU, hourlyQuantity } = calculateDhuAndAcv(gmtDefects, qcPoint.workingHours, qcPoint.dailyTarget);
        totalDHUValue = parseFloat(totalDHU.toFixed(1));
        hourlyQuantityValues = hourlyQuantity;
        // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | ACV: ${group.ACV.toFixed(2)}%`));
    } else {
        return <p>Target and Working hours not found for this QC</p>;
    }

    return (
        <GmtQCDashboardPanel
            part="back"
            obbSheetId={params.obbSheetId}
            defects={qcPoint?.defects}
            qcPoint={qcPoint}
            totalStatusCounts={defectCounts.totalStatusCounts}
            currentHourStatusCounts={defectCounts.currentHourStatusCounts}
            totalDHU={totalDHUValue}
            hourlyQuantity={hourlyQuantityValues}
        />
    );
}

export default GmtQCScanningPointPage;
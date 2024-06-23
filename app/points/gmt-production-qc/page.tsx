import moment from "moment-timezone";

import { db } from "@/lib/db";
import QCDashboardPanel from "./_components/qc-dashboard-panel";
import { QcSectionTarget } from "@prisma/client";

const ScanningPoint4Page = async () => {
    const date = new Date;
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment(date).tz(timezone).format('YYYY-MM-DD');

    const qcSection = await db.qcSection.findUnique({
        where: {
            name: "Product Assembly QC"
        },
        include: {
            defect: true
        }
    });

    const qcTarget: QcSectionTarget[] | null = await db.qcSectionTarget.findMany({
        where: {
            qcSectionId: qcSection?.id,
            date: today
        }
    });

    return (
        <QCDashboardPanel 
            defects={qcSection?.defect} 
            qcTarget={qcTarget[0]}
        />
    )
}

export default ScanningPoint4Page
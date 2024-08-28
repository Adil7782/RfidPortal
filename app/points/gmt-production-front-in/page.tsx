import moment from "moment-timezone";

import GmtInQrScanningPanel from "@/components/scanning-point/gmt-in-qr-scanning-panel";
import { db } from "@/lib/db";

const ScanningPoint3Page = async () => {
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
    const today = moment().tz(timezone).format('YYYY-MM-DD');
    const startDate = `${today} 00:00:00`;
    const endDate = `${today} 23:59:59`;

    const gmtCount = await db.gmtData.count({
        where: {
            timestampProduction: {
                gte: startDate,
                lte: endDate
            },
            partName: "FRONT"
        }
    });

    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            <GmtInQrScanningPanel 
                part="front"
                gmtCount={gmtCount}
            />
        </section>
    )
}

export default ScanningPoint3Page
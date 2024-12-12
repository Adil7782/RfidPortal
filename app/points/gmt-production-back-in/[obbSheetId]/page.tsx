import moment from "moment-timezone";

import { db } from "@/lib/db";
import GmtInQrScanningPanel from "@/components/scanning-point/gmt-in-qr-scanning-panel";

const ScanningPoint3Page = async ({
    params
}: {
    params: { obbSheetId: string }
}) => {
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
            partName: "BACK",
            obbSheetId: params.obbSheetId
        }
    });

    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            <GmtInQrScanningPanel 
                part="back"
                gmtCount={gmtCount}
                obbSheetId={params.obbSheetId}
            />
        </section>
    )
}

export default ScanningPoint3Page
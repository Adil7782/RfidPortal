import moment from "moment-timezone";

import CuttingStoreScanningPanel from "./_components/cutting-store-scanning-panel";
import { db } from "@/lib/db";

const ScanningPoint2Page = async () => {
  const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka'
  const today = moment().tz(timezone).format('YYYY-MM-DD');
  const startDate = `${today} 00:00:00`;
  const endDate = `${today} 23:59:59`;

  const bundleCount = await db.bundleData.count({
    where: {
      timestampStoreIn: {
        gte: startDate,
        lte: endDate
      }
    }
  });

  return (
    <section className='p-4 h-full flex flex-col justify-center items-center'>
      <CuttingStoreScanningPanel bundleCount={bundleCount}/>
    </section>
  )
}

export default ScanningPoint2Page
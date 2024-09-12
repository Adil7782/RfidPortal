import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/lib/db"

import BarChartGraphOpSmv from "./_components/all-defect-chart";
import AnalyticsChart from "./_components/analytics-chart";

const DayEndReportPage = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (!token) {
        return redirect('/sign-in');
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    const verified = verify(value, secret) as JwtPayloadType;

    

    return (
        <div>
        
            <AnalyticsChart title="Helo"/>
        </div>
    )
}

export default DayEndReportPage
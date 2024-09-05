import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/lib/db"
import DayEndReport from "./_components/day-end-report";

const DayEndReportPage = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (!token) {
        return redirect('/sign-in');
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    const verified = verify(value, secret) as JwtPayloadType;

    const scanningPoints = await db.scanningPoint.findMany({
        select: {
            id: true,
            name: true,
            pointNo: true,
        },
        orderBy: {
            pointNo: "asc",
        }
    });

    return (
        <div>
            <DayEndReport scanningPoints={scanningPoints} userName={verified.user.name}/>
        </div>
    )
}

export default DayEndReportPage
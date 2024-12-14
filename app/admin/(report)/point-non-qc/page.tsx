import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { db } from "@/lib/db"
import DayEndLineNonQcReport from "../../reports/day-end/_components/day-end-line-nonqc-report";
import { CardTitle } from "@/components/ui/card";



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

    return(
        
<div className="sticky top-16 py-2 pr-3 pl-6 w-full z-50 border-b rounded-t-lg  items-center bg-white/80 backdrop-blur-lg">

<CardTitle className="text-center sticky">
    {" "}
    {" "}
    Point Wise Report Non QC
  </CardTitle>
  <DayEndLineNonQcReport scanningPoints={scanningPoints} userName={verified.user.name} />
  </div>
    );
}
    export default DayEndReportPage
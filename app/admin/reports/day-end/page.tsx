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
import DayEndReport from "./_components/day-end-report";
import DayEndLineQcReport from "./_components/day-end-line-qc-report";

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
        <div className="mt-16 mx-auto max-w-7xl">
            <Tabs defaultValue="1" className="w-full">
                <TabsList>
                    <TabsTrigger value="1">Point-wise Report</TabsTrigger>
                    <TabsTrigger value="2">Line End Report</TabsTrigger>
                </TabsList>
                <p className="mt-1 text-sm text-slate-500">(Please click the tabs to change the report)</p>
                <TabsContent value="1">
                    <DayEndReport scanningPoints={scanningPoints} userName={verified.user.name} />
                </TabsContent>
                <TabsContent value="2">
                    <DayEndLineQcReport userName={verified.user.name} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DayEndReportPage
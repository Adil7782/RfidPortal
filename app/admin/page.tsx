import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import UserProfileButton from "@/components/auth/user-profile-button";
import UserComponent from "./_components/user-component";
import LineComponent from "./_components/line-component";
import QCSectionTargetComponent from "./_components/qc-section-target-component";
import BarChartComponent from "./_components/bar-chart-component";
import TargetChartComponent from "./_components/target-chart-component";
import { countProductsBySection } from "@/actions/count-products-by-section";
import { db } from "@/lib/db";

const AdminPage = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');
    let verified: JwtPayloadType | undefined;

    if (token) {
        const { value } = token;
        const secret = process.env.JWT_SECRET || "";
        
        verified = verify(value, secret) as JwtPayloadType;
    };

    const products = await db.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    const frontGmtCount = await db.gmtData.count({
        where: {
            partName: "FRONT",
            timestampProduction: { not: null }
        }
    });
    const backGmtCount = await db.gmtData.count({
        where: {
            partName: "BACK",
            timestampProduction: { not: null }
        }
    });

    return (
        <div className='mt-14'>
            <Tabs defaultValue="targetChart" className="w-full">
                <div className="w-full flex justify-between items-center gap-8">
                    <TabsList className="grid w-full md:w-full grid-cols-5">
                        <TabsTrigger value="targetChart" className="text-base">Target Chart</TabsTrigger>
                        <TabsTrigger value="poductCountChart" className="text-base">Product Count Chart</TabsTrigger>
                        <TabsTrigger value="line" className="text-base">Manage Lines</TabsTrigger>
                        <TabsTrigger value="user" className="text-base">Manage Users</TabsTrigger>
                        <TabsTrigger value="qc-target" className="text-base">Manage QC Section Target</TabsTrigger>
                    </TabsList>
                    <UserProfileButton
                        role={verified?.user.role}
                        name={verified?.user.name}
                        email={verified?.user.email}
                        pointNo={verified?.scanningPoint.pointNo}
                    />
                </div>
                <TabsContent value="targetChart">
                    <TargetChartComponent />
                </TabsContent>
                <TabsContent value="poductCountChart">
                    <BarChartComponent 
                        frontGmtCount={frontGmtCount}
                        backGmtCount={backGmtCount}
                        sectionCounts={countProductsBySection(products)} 
                    />
                </TabsContent>
                <TabsContent value="line">
                    <LineComponent />
                </TabsContent>
                <TabsContent value="user">
                    <UserComponent />
                </TabsContent>
                <TabsContent value="qc-target">
                    <QCSectionTargetComponent />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default AdminPage
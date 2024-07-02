import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import UserComponent from "./_components/user-component";
import LineComponent from "./_components/line-component";
import UserProfileButton from "@/components/auth/user-profile-button";
import QCSectionTargetComponent from "./_components/qc-section-target-component";

const AdminPage = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');
    let verified: JwtPayloadType | undefined;

    if (token) {
        const { value } = token;
        const secret = process.env.JWT_SECRET || "";
        
        verified = verify(value, secret) as JwtPayloadType;
    }

    return (
        <div className='mt-14'>
            <Tabs defaultValue="line" className="w-full">
                <div className="w-full flex justify-between">
                    <TabsList className="grid w-full md:w-2/3 grid-cols-3">
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
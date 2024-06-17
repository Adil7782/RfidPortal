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
                    <TabsList className="grid w-full md:w-1/2 grid-cols-2">
                        <TabsTrigger value="line" className="text-base">Manage Lines</TabsTrigger>
                        <TabsTrigger value="user" className="text-base">Manage Users</TabsTrigger>
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
            </Tabs>

        </div>
    )
}

export default AdminPage
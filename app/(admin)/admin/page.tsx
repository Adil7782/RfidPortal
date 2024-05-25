import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import UserComponent from "./_components/user-component";
import LineComponent from "./_components/line-component";

const AdminPage = () => {
    return (
        <div className='mt-14'>
            <Tabs defaultValue="line" className="w-full">
                <TabsList className="grid w-full md:w-1/2 grid-cols-2">
                    <TabsTrigger value="line" className="text-base">Manage Lines</TabsTrigger>
                    <TabsTrigger value="user" className="text-base">Manage Users</TabsTrigger>
                </TabsList>
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
import Image from 'next/image';
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

import Sidebar from './_components/sidebar';
import UserProfileButton from '@/components/auth/user-profile-button';
import DashboardHeader from './_components/dashboard-hrader';

const AdminLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (!token) {
        return redirect('/sign-in');
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    const verified = verify(value, secret) as JwtPayloadType;

    if (verified.user.role !== 'admin') {
        return redirect('/')
    };

    return (
        <div className="h-screen w-full">
            <div className="flex felx-col h-full w-64 fixed inset-y-0 z-50">
                <Sidebar />
                   
            </div>
            <div className="ml-64 h-full">
                <div className="sticky top-0 py-2 pr-3 pl-6 w-full z-10 border-b shadow-sm flex justify-between items-center bg-white/80 backdrop-blur-lg">
                    <h1 className='text-lg font-medium text-slate-800'>Admin Dashboard</h1>
                    <UserProfileButton
                        role={verified?.user.role}
                        name={verified?.user.name}
                        email={verified?.user.email}
                        pointNo={verified?.scanningPoint.pointNo}
                    />
                </div>
                <main className="admin-dashboard-body-height px-4">
                    {children}
                </main>
                <div className="bottom-0 flex justify-center">
                    <div className='p-4 flex items-center gap-2'>
                        <p className='text-sm text-slate-500'>Powered by</p>
                        <Image
                            src='/images/logo.png'
                            alt='Logo Image'
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
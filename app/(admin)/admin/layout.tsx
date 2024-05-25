import Image from 'next/image';
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

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
        <section className='w-full min-h-screen h-screen'>
            <div className='mx-auto max-w-7xl h-full flex flex-col justify-between items-center'>
                <main className='w-full p-4'>
                    {children}
                </main>
                <div className='p-4 flex items-center gap-2'>
                    <p className='text-sm text-slate-500'>Powered by</p>
                    <Image
                        src='/images/logo.svg'
                        alt='Logo Image'
                        width={100}
                        height={100}
                        // className='w-24'
                    />
                </div>
            </div>
        </section>
    )
}

export default AdminLayout
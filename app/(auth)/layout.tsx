import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (token) {
        return redirect('/');
    } else {
        return (
            <section className='w-full md:h-screen bg-white p-4 flex flex-col justify-between items-center'>
                <div className='mt-8 sm:mt-14 flex-center w-full'>
                    <Image
                        src='/images/logo.png'
                        alt='Logo Image'
                        width={400}
                        height={400}
                        className="max-sm:w-72"
                    />
                    <main className="mt-14 w-full flex justify-center">
                        {children}
                    </main>
                </div>
                <div className='w-full px-4 text-center flex justify-center items-center text-slate-400 text-sm'>
                    <p>© 2024, Emmanuel&apos;s Lanka Pvt Ltd. All rights reserved</p>
                </div>
            </section>
        )
    }
}

export default AuthLayout;
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const RootPage = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');
    let verified: JwtPayloadType | undefined;

    if (token) {
        const { value } = token;
        const secret = process.env.JWT_SECRET || "";
        
        verified = verify(value, secret) as JwtPayloadType;
    }

    return (
        <section className='w-screen h-screen bg-slate-100'>
            <div className='mx-auto max-w-7xl h-full p-4 flex flex-col justify-between items-center'>
                <div className='mt-24 flex-center'>
                    <Image
                        src='/images/logo.svg'
                        alt='Logo Image'
                        width={600}
                        height={600}
                        className='w-96'
                    />
                    <div className='mt-20 flex-center gap-6'>
                        <div className='flex-center gap-3'>
                            {verified !== undefined &&
                                <p className='text-slate-500 text-lg'>Hi {verified?.user.name} 👋,</p>
                            }
                            <h2 className='dark-text text-2xl'>
                                Welcome {verified !== undefined && 'back'} to the
                            </h2>
                            <h1 className='font-bold dark-text text-4xl'>ELIoT Tracker App!</h1>
                        </div>
                        <Separator className='w-1/2 h-0.5 rounded-full' />
                        <Link href={verified === undefined ? '/sign-in' : verified.user.role === 'admin' ? '/admin' : `/scanning-points/${verified.scanningPoint.pointNo}`}>
                            <Button variant={verified === undefined ? 'primary' : 'primaryOutline'} className='px-14 mt-2'>
                                {verified === undefined ? 'Login you account' : verified.user.role === 'admin' ? 'Go to your dashboard' : `Go to ${verified.scanningPoint.name}`}
                                <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='w-full px-4 flex justify-between items-center text-slate-500 text-sm'>
                    <p>© 2024, Emmanuel's Lanka Pvt Ltd. All rights reserved</p>
                    <p>Privacy & Policy</p>
                </div>
            </div>
        </section>
    )
}

export default RootPage
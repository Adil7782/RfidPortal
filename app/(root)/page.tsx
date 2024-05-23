import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const RootPage = () => {
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
                            <h2 className='text-slate-500 text-2xl'>Welcome to the 👋</h2>
                            <h1 className='font-bold dark-text text-4xl'>ELIoT Tracker App!</h1>
                        </div>
                        <Separator className='w-1/2 h-0.5 rounded-full' />
                        <Button variant="primary" className='px-14 mt-2'>
                            Login you account
                            <ArrowRight />
                        </Button>
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
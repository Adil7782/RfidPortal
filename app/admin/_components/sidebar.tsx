"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SIDEBAR_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-between top-0 bottom-0 left-0 min-h-screen w-full z-50 text-white bg-[#05050b]">
            <div className="flex flex-col items-start px-2 pt-4">
                <div className="w-full px-6 py-3 border-b border-white/15">
                    <Link href="/admin">
                        <Image
                            src='/images/logo.svg'
                            alt="logo"
                            width={140}
                            height={140}
                            // className="w-[110px]"
                        />
                    </Link>
                </div>
                <ScrollArea className='mt-4 h-full w-full overflow-y-auto sidebar-routes'>
                    <div className='space-y-2'>
                        {SIDEBAR_ROUTES.map(route => (
                            <Link
                                href={route.href}
                                key={route.href}
                                className={cn(
                                    "flex flex-row items-center px-3 py-2.5 gap-3 text-slate-200/80 border border-transparent hover:text-slate-200 hover:bg-white/10 rounded-sm cursor-pointer transition",
                                    route.href === pathname && "text-slate-200 bg-white/10 border-white/10"
                                )}
                            >
                                <route.icon className="w-5 h-5" />
                                <p className="text-sm font-semibold w-40">{route.label}</p>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <p className='w-full text-sm tracking-wide text-slate-200/50 text-center'>Emmanuels Lanka (pvt) Ltd.</p>
            </div>
        </div>
    )
}

export default Sidebar
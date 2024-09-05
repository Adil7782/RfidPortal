"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SIDEBAR_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className='flex flex-col justify-center left-0 h-full w-full z-50 p-4'>
            <div className='h-fit -mt-16 space-y-1'>
                {SIDEBAR_ROUTES.map(route => (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                            "flex flex-row items-center px-3 py-2.5 gap-3 text-slate-800/80 border border-transparent hover:text-slate-800 hover:bg-slate-200 rounded-sm cursor-pointer transition",
                            route.href === pathname && "primary-text bg-[#0980D4]/5 border-slate-800/10 hover:bg-[#0980D4]/10"
                        )}
                    >
                        <route.icon className="w-5 h-5" />
                        <p className="text-sm font-semibold w-40">{route.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronRight } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import { SIDEBAR_ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

export interface SidebarRoute {
    label: string;
    href: string;
    icon?: any;
    children?: {
        label: string;
        href: string;
        icon?:any
    }[];
}

const SidebarItem = ({ route, pathname }: { route: SidebarRoute; pathname: string }) => {
    const isActive = pathname === route.href;
    const hasChildren = route.children && route.children.length > 0;
    const isChildActive = route.children?.some(child => pathname === child.href);

    if (!hasChildren) {
        return (
            <Link href={route.href || ''}>
                <div
                    className={cn(
                        "flex flex-row items-center px-3 py-2.5 gap-3 text-slate-200/80 border border-transparent hover:text-slate-200 hover:bg-white/10 rounded-sm cursor-pointer transition",
                        isActive && "text-slate-200 bg-white/10 border-white/10"
                    )}
                >
                    {route.icon && <route.icon className="w-5 h-5" />}
                    <p className="text-sm font-semibold">{route.label}</p>
                </div>
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        "flex flex-row items-center px-3 py-2.5 gap-3 text-slate-200/80 border border-transparent hover:text-slate-200 hover:bg-white/10 rounded-sm cursor-pointer transition",
                        isChildActive && "text-slate-200 bg-white/10 border-white/10"
                    )}
                >
                    {route.icon && <route.icon className="w-5 h-5" />}
                    <p className="text-sm font-semibold flex-1">{route.label}</p>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 bg-[#05050b] border-white/10"
                align="start"
                side="right"
            >
                {route.children?.map((child) => (
                    <DropdownMenuItem
                        key={child.href}
                        className="focus:bg-white/10 focus:text-slate-200"
                    > 
                     {child.icon && <child.icon className="w-5 h-5 mr-2   text-slate-200/80" />} 
                        <Link
                            href={child.href}
                            className={cn(
                                "flex w-full text-sm text-slate-200/80",
                                pathname === child.href && "text-slate-200"
                            )}
                        >
                            {child.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-between top-0 bottom-0 left-0 min-h-screen w-full z-50 text-white bg-[#05050b]">
            <div className="flex flex-col items-start px-2">
                <div className="w-full px-6 pt-5 pb-6 border-b border-white/15">
                    <Link href="/admin">
                        <Image
                            src='/images/logo.png'
                            alt="logo"
                            width={140}
                            height={140}
                        />
                    </Link>
                </div>
                <ScrollArea className='mt-4 h-full w-full overflow-y-auto sidebar-routes'>
                    <div className='space-y-1 px-2'>
                        {SIDEBAR_ROUTES.map((route) => (
                            <SidebarItem 
                                key={route.href || route.label} 
                                route={route} 
                                pathname={pathname}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <p className='w-full py-4 text-sm tracking-wide text-slate-200/50 text-center'>
                Emmanuels Lanka (pvt) Ltd.
            </p>
        </div>
    );
};

export default Sidebar;
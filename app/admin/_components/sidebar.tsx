"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

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
    icon?: LucideIcon;
    children?: SidebarRoute[];
  }

  interface SidebarItemProps {
    route: SidebarRoute;
    pathname: string;
    level?: number;
  }
  
  export function SidebarItem({ route, pathname, level = 0 }: SidebarItemProps) {
    const hasChildren = route.children && route.children.length > 0;
    const isActive = pathname === route.href;
    const isChildActive = route.children?.some(
      (child) =>
        pathname === child.href ||
        child.children?.some((grandChild) => pathname === grandChild.href)
    );
  
    const itemContent = (
      <>
        {route.icon && <route.icon className="w-5 h-5" />}
        <span className="text-sm font-semibold flex">{route.label}</span>
        {hasChildren && (
          <ChevronRight className="w-4 h-4 transition-transform" />
        )}
      </>
    );
  
    const itemStyles = cn(
      "flex flex-row items-center px-3 py-2.5 gap-3 text-slate-200/80 border border-transparent hover:text-slate-200 hover:bg-white/10 rounded-sm cursor-pointer transition w-full",
      (isActive || isChildActive) && "text-slate-200 bg-white/10 border-white/10",
      level > 0 && ""
    );
  
    if (!hasChildren) {
      return (
        <Link href={route.href} className={itemStyles}>
          {itemContent}
        </Link>
      );
    }
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full focus:outline-none">
          <div className={itemStyles}>{itemContent}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align='start'
          

          className="w-48 bg-[#0a0a14] border-white/10"
        >
          {route.children?.map((child) => (
            <SidebarItem
              key={child.href || child.label}
              route={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

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
          <ScrollArea className="mt-4 h-[calc(100vh-200px)] w-full overflow-y-auto sidebar-routes">
            <div className="space-y-1 px-2">
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
        <p className="w-full py-4 text-sm tracking-wide text-slate-200/50 text-center">
          Emmanuels Lanka (pvt) Ltd.
        </p>
      </div>
    );
  };
  
export default Sidebar;
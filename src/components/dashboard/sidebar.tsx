"use client";

import { LayoutGrid, Video, Monitor, Settings, ShieldAlert, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const pathname = usePathname();

    const routes = [
        {
            label: "Panel General",
            icon: LayoutGrid,
            href: "/",
            active: pathname === "/",
        },
        {
            label: "Cámaras",
            icon: Video,
            href: "/cameras",
            active: pathname === "/cameras",
        },
        {
            label: "Escritorios",
            icon: Monitor,
            href: "/desktops",
            active: pathname === "/desktops",
        },
    ];

    return (
        <div className="h-full flex flex-col bg-[#0f172a] border-r border-slate-800 w-[280px] shrink-0 text-slate-300">
            {/* Header */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <ShieldAlert className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white leading-none">OmniView</h2>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Control Unificado</p>
                    </div>
                </Link>
            </div>

            {/* Main Nav */}
            <div className="px-4 space-y-2 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-3 mb-4">Menu Principal</p>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                            route.active
                                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {route.active && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg" />
                        )}
                        <route.icon className={cn("w-5 h-5", route.active ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300")} />
                        {route.label}
                    </Link>
                ))}
            </div>

            {/* Footer / User Profile User */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-slate-900 group-hover:ring-slate-700 transition-all">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Admin User</p>
                        <p className="text-xs text-slate-500 truncate group-hover:text-slate-400 transition-colors">Sistemas</p>
                    </div>
                    <Settings className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
            </div>
        </div>
    );
}

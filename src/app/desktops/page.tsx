"use client";

import { COMPUTERS, Computer, Department } from "@/lib/mock-data";
import { Monitor, Wifi, WifiOff, Activity, Clock, Search, Filter, RefreshCcw, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VncModal } from "@/components/dashboard/vnc-modal";

export default function DesktopsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "online" | "offline" | "busy">("all");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);

    // Simulation of periodic refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setIsRefreshing(true);
            setTimeout(() => setIsRefreshing(false), 800); // Effect duration
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Filter logic
    const filteredComputers = COMPUTERS.filter(pc => {
        const matchesSearch = pc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pc.currentUser?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || pc.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Grouping
    const departments: Department[] = ["Desarrollo", "Administración", "Ventas", "Recepción", "Sistemas"];

    const getComputersByDepartment = (dept: Department) => {
        return filteredComputers.filter(c => c.department === dept);
    };

    return (
        <div className="flex-1 p-8 overflow-auto bg-[#050505] text-slate-100 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505]">
            <VncModal
                isOpen={!!selectedComputer}
                onClose={() => setSelectedComputer(null)}
                computer={selectedComputer}
            />

            {/* Header Section */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Escritorios Remotos</h1>
                    <p className="text-slate-400 font-light">Monitorización y control de estaciones de trabajo</p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/50 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm shadow-xl">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            placeholder="Buscar equipo..."
                            className="w-full h-9 pl-9 pr-4 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block" />
                    <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto no-scrollbar">
                        {['all', 'online', 'busy', 'offline'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status as any)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                                    filterStatus === status
                                        ? "bg-slate-800 text-white shadow-sm ring-1 ring-white/10"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                                )}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {departments.map(dept => {
                    const computers = getComputersByDepartment(dept);
                    if (computers.length === 0) return null;

                    return (
                        <div key={dept} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{dept}</h2>
                                <div className="h-px bg-slate-800 flex-1" />
                                <span className="text-xs font-medium text-slate-600 bg-slate-900/50 px-2 py-0.5 rounded-full border border-slate-800">{computers.length}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {computers.map(pc => (
                                    <div
                                        key={pc.id}
                                        onClick={() => setSelectedComputer(pc)}
                                        className="group relative bg-slate-900/40 border border-slate-800/60 rounded-xl overflow-hidden hover:border-blue-500/30 hover:bg-slate-800/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer backdrop-blur-sm"
                                    >
                                        {/* Screenshot Container */}
                                        <div className="aspect-[16/10] bg-black relative overflow-hidden">
                                            {/* Screen Glare Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                                            {pc.screenshotUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={pc.screenshotUrl}
                                                    alt={`Escritorio de ${pc.name}`}
                                                    className={cn(
                                                        "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
                                                        pc.status === 'offline' && "grayscale opacity-25"
                                                    )}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-950">
                                                    <Monitor className="w-12 h-12 text-slate-800" />
                                                </div>
                                            )}

                                            {/* Status Indicator (Subtle) */}
                                            <div className="absolute top-3 left-3 z-20">
                                                <div className={cn(
                                                    "w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] border border-white/20",
                                                    pc.status === 'online' ? "bg-green-500 shadow-green-500/50" :
                                                        pc.status === 'busy' ? "bg-amber-500 shadow-amber-500/50" :
                                                            pc.status === 'maintenance' ? "bg-purple-500 shadow-purple-500/50" :
                                                                "bg-slate-600"
                                                )} />
                                            </div>

                                            {/* Refresh Overlay */}
                                            <div className={cn(
                                                "absolute inset-0 bg-white/5 z-20 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none flex items-center justify-center",
                                                isRefreshing ? "opacity-100" : "opacity-0"
                                            )}>
                                            </div>

                                            {/* Hover Badge */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[1px]">
                                                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-md transform scale-95 group-hover:scale-100 transition-transform">
                                                    Controlar
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition-colors tracking-tight">{pc.name}</h3>
                                                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{pc.ip}</p>
                                                </div>
                                                <MoreHorizontal className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/50">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center border border-slate-700/50 text-[9px] font-bold text-slate-300 shadow-sm">
                                                    {pc.currentUser ? pc.currentUser.charAt(0) : '?'}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-xs text-slate-400 truncate hover:text-slate-300 transition-colors">{pc.currentUser || "Sin usuario"}</p>
                                                </div>
                                                {pc.status === 'online' && (
                                                    <Activity className="w-3 h-3 text-green-500/50" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

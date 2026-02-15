"use client";

import { COMPUTERS, Computer, Department } from "@/lib/mock-data";
import { Monitor, Search, User, Clock, Shield, Signal, Wifi, Power, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { VncModal } from "@/components/dashboard/vnc-modal";

export default function DesktopsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "online" | "offline" | "busy">("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);

    const filteredComputers = COMPUTERS.filter(pc => {
        const matchesSearch = pc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pc.currentUser?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || pc.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const departments: Department[] = ["Desarrollo", "Administración", "Ventas", "Recepción", "Sistemas"];

    const getComputersByDepartment = (dept: Department) => {
        return filteredComputers.filter(c => c.department === dept);
    };

    return (
        <div className="flex-1 p-6 md:p-8 overflow-auto bg-[#050505] text-slate-100 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505]">
            <VncModal
                isOpen={!!selectedComputer}
                onClose={() => setSelectedComputer(null)}
                computer={selectedComputer}
            />

            {/* Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                        <Monitor className="w-8 h-8 text-cyan-500" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Escritorios Remotos</span>
                    </h1>
                    <p className="text-slate-500 font-mono text-sm tracking-wide">
                        ESTACIONES DE TRABAJO ACTIVAS: <span className="text-cyan-400">{COMPUTERS.filter(c => c.status === 'online').length}</span> / {COMPUTERS.length}
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-slate-900/80 border border-slate-800 rounded-lg flex items-center p-2 backdrop-blur-md">
                            <Search className="w-4 h-4 text-slate-500 ml-2" />
                            <input
                                placeholder="Buscar usuario o ID..."
                                className="bg-transparent border-none focus:ring-0 text-sm text-white pl-3 w-64 placeholder:text-slate-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex bg-slate-900/80 border border-slate-800 rounded-lg p-1 backdrop-blur-md h-fit">
                            {['all', 'online', 'busy', 'offline'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status as any)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all",
                                        filterStatus === status
                                            ? "bg-cyan-900/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20"
                                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="flex bg-slate-900/80 border border-slate-800 rounded-lg p-1 backdrop-blur-md h-fit">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    viewMode === 'grid'
                                        ? "bg-cyan-900/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                                )}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    viewMode === 'list'
                                        ? "bg-cyan-900/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                                )}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {departments.map(dept => {
                    const computers = getComputersByDepartment(dept);
                    if (computers.length === 0) return null;

                    return (
                        <div key={dept} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-2 w-2 bg-cyan-500 rotate-45" />
                                <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.2em]">{dept}</h2>
                                <div className="h-px bg-gradient-to-r from-cyan-900/50 to-transparent flex-1" />
                            </div>

                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                    {computers.map(pc => (
                                        <div
                                            key={pc.id}
                                            onClick={() => setSelectedComputer(pc)}
                                            className="group relative bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] cursor-pointer backdrop-blur-sm flex flex-col"
                                        >
                                            <div className={cn(
                                                "h-1 w-full absolute top-0 left-0 z-20",
                                                pc.status === 'online' ? "bg-green-500 shadow-[0_0_10px_#22c55e]" :
                                                    pc.status === 'busy' ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]" :
                                                        "bg-slate-700"
                                            )} />

                                            <div className="aspect-[16/10] bg-black relative overflow-hidden group-hover:opacity-100 transition-opacity">
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40" />
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-20 pointer-events-none" />

                                                {pc.screenshotUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={pc.screenshotUrl}
                                                        alt={pc.name}
                                                        className={cn(
                                                            "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110",
                                                            pc.status === 'offline' && "grayscale opacity-30"
                                                        )}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Monitor className="w-12 h-12 text-slate-800" />
                                                    </div>
                                                )}

                                                <div className="absolute top-3 right-3 z-30 flex flex-col gap-1 items-end">
                                                    <div className={cn(
                                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md",
                                                        pc.status === 'online' ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                                            pc.status === 'busy' ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                                                "bg-slate-800/80 text-slate-500 border-slate-700"
                                                    )}>
                                                        {pc.status}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 flex flex-col gap-3 relative overflow-hidden">
                                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors" />

                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{pc.name}</h3>
                                                        <p className="text-xs text-slate-500 font-mono">ID: {pc.id}</p>
                                                    </div>
                                                    <Wifi className={cn("w-4 h-4", pc.status === 'offline' ? "text-slate-600" : "text-cyan-500")} />
                                                </div>

                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-cyan-500/30 transition-colors">
                                                        <User className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-slate-200 font-medium">{pc.currentUser || "Sin usuario"}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Logueado hace 2h</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-2">
                                    {computers.map(pc => (
                                        <div
                                            key={pc.id}
                                            onClick={() => setSelectedComputer(pc)}
                                            className="group flex items-center gap-4 p-3 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-all cursor-pointer hover:bg-slate-800/60 shadow-lg hover:shadow-cyan-500/10"
                                        >
                                            <div className={cn(
                                                "w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] shrink-0",
                                                pc.status === 'online' ? "bg-green-500 shadow-green-500/50" :
                                                    pc.status === 'busy' ? "bg-amber-500 shadow-amber-500/50" :
                                                        "bg-slate-700"
                                            )} />

                                            <div className="h-12 w-20 bg-black rounded overflow-hidden relative hidden sm:block border border-slate-700/50 shrink-0">
                                                {pc.screenshotUrl ? (
                                                    <img src={pc.screenshotUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-950">
                                                        <Monitor className="w-6 h-6 text-slate-800" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                                <div className="col-span-1 sm:col-span-3">
                                                    <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors truncate">{pc.name}</h3>
                                                    <p className="text-[10px] text-slate-500 font-mono truncate">{pc.id}</p>
                                                </div>

                                                <div className="col-span-1 sm:col-span-3 flex items-center gap-2">
                                                    <User className="w-3 h-3 text-slate-500 shrink-0" />
                                                    <span className="text-sm text-slate-300 truncate">{pc.currentUser || "---"}</span>
                                                </div>

                                                <div className="col-span-1 sm:col-span-3 hidden sm:flex items-center gap-2">
                                                    <Clock className="w-3 h-3 text-slate-600 shrink-0" />
                                                    <span className="text-xs text-slate-500">2h active</span>
                                                </div>

                                                <div className="col-span-1 sm:col-span-3 text-right">
                                                    <div className={cn(
                                                        "inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                                                        pc.status === 'online' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                            pc.status === 'busy' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                                                "bg-slate-800 text-slate-500 border-slate-700"
                                                    )}>
                                                        {pc.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

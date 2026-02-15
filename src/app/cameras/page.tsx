"use client";

import { CAMERAS } from "@/lib/mock-data";
import { Video, AlertCircle, CheckCircle2, Maximize2, Activity, Signal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CamerasPage() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('es-ES'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 p-6 md:p-8 overflow-auto bg-[#050505] text-slate-100 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505]">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
                        <Video className="w-8 h-8 text-cyan-500" />
                        Sistema de Videovigilancia
                    </h1>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/80">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        LIVE STREAMING • {currentTime} • SECURE CONNECTION
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-4 py-2 backdrop-blur-md flex items-center gap-3">
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-slate-300">System Status: <span className="text-green-400 font-bold">OPTIMAL</span></span>
                    </div>
                </div>
            </div>

            {/* Camera Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {CAMERAS.map(cam => (
                    <div
                        key={cam.id}
                        className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    >
                        {/* Video Feed (Placeholder) */}
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            {/* Static/Noise effect overlay */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                            {/* Placeholder Content */}
                            <div className="text-slate-700 flex flex-col items-center">
                                <Signal className="w-12 h-12 mb-2 opacity-20 animate-pulse" />
                                <span className="text-xs font-mono tracking-widest opacity-40">NO SIGNAL DETECTED</span>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Overlays */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono border border-white/10 text-cyan-400 font-bold tracking-wider">
                                CAM-{cam.id}
                            </div>
                            <div className={cn(
                                "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold border backdrop-blur-md",
                                cam.status === 'active'
                                    ? "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse"
                                    : "bg-slate-800/80 text-slate-400 border-slate-700"
                            )}>
                                {cam.status === 'active' ? (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> REC
                                    </>
                                ) : "OFFLINE"}
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-black/60 hover:bg-cyan-500 hover:text-black text-white rounded border border-white/10 transition-colors">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                            <div>
                                <h3 className="text-white font-medium text-sm drop-shadow-md">{cam.name}</h3>
                                <p className="text-[10px] text-slate-400 font-mono">{cam.location}</p>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">
                                1920x1080 • 30fps
                            </div>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg pointer-events-none" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
}

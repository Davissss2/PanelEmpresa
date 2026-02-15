"use client";

import { CAMERAS } from "@/lib/mock-data";
import { Video, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CamerasPage() {
    return (
        <div className="flex-1 p-8 overflow-auto bg-[#0f172a] text-slate-100 h-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Cámaras en Vivo</h1>
                <p className="text-slate-400">Monitorización de seguridad en tiempo real</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {CAMERAS.map((camera) => (
                    <div key={camera.id} className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-xl transition-all hover:border-slate-700 hover:shadow-2xl">
                        {/* Video Area */}
                        <div className="aspect-video bg-black relative flex items-center justify-center">
                            <Video className="w-12 h-12 text-slate-800" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                <div className={cn(
                                    "w-2 h-2 rounded-full animate-pulse",
                                    camera.status === 'active' ? "bg-green-500" : "bg-red-500"
                                )} />
                                <span className={cn(
                                    "text-xs font-semibold uppercase tracking-wider",
                                    camera.status === 'active' ? "text-green-400" : "text-red-400"
                                )}>
                                    {camera.status === 'active' ? 'LIVE' : 'ERROR'}
                                </span>
                            </div>
                        </div>

                        {/* Info Area */}
                        <div className="p-4 bg-slate-900/50 backdrop-blur">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{camera.name}</h3>
                                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                        <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">ID</span>
                                        {camera.id.toUpperCase()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 m-0">
                                    {camera.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

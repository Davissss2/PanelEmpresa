"use client";

import { CAMERAS, COMPUTERS } from "@/lib/mock-data";
import { Activity, ShieldCheck, AlertTriangle, Monitor, Video, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  // Stats calculation
  const totalPCs = COMPUTERS.length;
  const onlinePCs = COMPUTERS.filter(c => c.status === 'online').length;
  const busyPCs = COMPUTERS.filter(c => c.status === 'busy').length;
  const offsetPCs = totalPCs - (onlinePCs + busyPCs);

  const activeCameras = CAMERAS.filter(c => c.status === 'active').length;
  const totalCameras = CAMERAS.length;

  const stats = [
    {
      label: "Equipos Online",
      value: onlinePCs,
      total: totalPCs,
      icon: Monitor,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      label: "Cámaras Activas",
      value: activeCameras,
      total: totalCameras,
      icon: Video,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      label: "Incidencias",
      value: CAMERAS.filter(c => c.status === 'error').length + COMPUTERS.filter(c => c.status === 'offline').length,
      total: null,
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    }
  ];

  return (
    <div className="flex-1 p-8 overflow-auto bg-[#0f172a] text-slate-100 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Panel General</h1>
        <p className="text-slate-400">Visión global del sistema y métricas clave</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className={cn("p-6 rounded-2xl border bg-slate-900/50 backdrop-blur flex items-center justify-between", stat.border)}>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{stat.value}</span>
                {stat.total !== null && <span className="text-sm text-slate-500">/ {stat.total}</span>}
              </div>
            </div>
            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity / Status */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Estado del Sistema
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-500">OPERATIVO</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-white">Red de Equipos</p>
                  <p className="text-xs text-slate-500">LAN Principal - 1000 Mbps</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-400">ESTABLE</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-white">Servidor de Video</p>
                  <p className="text-xs text-slate-500">Grabación Continua (30 días)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-400">GRABANDO</span>
            </div>
          </div>
        </div>

        {/* Quick Actions / Shortcuts */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="font-bold text-lg text-white mb-6">Accesos Directos</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/cameras" className="group p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                <Video className="w-5 h-5 text-blue-500" />
              </div>
              <p className="font-bold text-white group-hover:text-blue-400 transition-colors">Ver Cámaras</p>
              <p className="text-xs text-slate-500 mt-1">Acceso a 4 streams</p>
            </Link>
            <Link href="/desktops" className="group p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                <Monitor className="w-5 h-5 text-purple-500" />
              </div>
              <p className="font-bold text-white group-hover:text-purple-400 transition-colors">Ver Equipos</p>
              <p className="text-xs text-slate-500 mt-1">Control remoto VNC</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

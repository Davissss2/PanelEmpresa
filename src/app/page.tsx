"use client";

import { Activity, ShieldCheck, AlertTriangle, Monitor, Video, Server, Users, Bell, Cpu, HardDrive } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// --- Components ---

const NeonCard = ({
  title,
  value,
  icon: Icon,
  color,
  children
}: {
  title: string;
  value: string;
  icon: any;
  color: "green" | "blue" | "red";
  children?: React.ReactNode
}) => {
  const colorStyles = {
    green: "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)] text-green-400",
    blue: "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-cyan-400",
    red: "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)] text-red-400",
  };

  const gradientStyles = {
    green: "from-green-500/10 to-transparent",
    blue: "from-cyan-500/10 to-transparent",
    red: "from-red-500/10 to-transparent",
  };

  return (
    <div className={cn(
      "relative p-6 rounded-2xl border bg-slate-900/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-[1.02]",
      colorStyles[color]
    )}>
      {/* Background Gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none", gradientStyles[color])} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2 rounded-lg bg-slate-950/50 border border-current", colorStyles[color].split(" ")[0])}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex space-x-1">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-cyan-500' : 'bg-red-500')} />
          </div>
        </div>

        <h3 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">{title}</h3>
        <div className="text-3xl font-bold text-white tracking-tight text-shadow-sm">{value}</div>

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

const Waveform = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    setBars(Array.from({ length: 20 }, () => Math.random() * 80 + 20));
  }, []);

  return (
    <div className="w-full h-full min-h-[100px] flex items-end justify-between gap-1 overflow-hidden opacity-80">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-full bg-cyan-500/40 rounded-t-sm animate-pulse"
          style={{
            height: `${height}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.5s'
          }}
        />
      ))}
    </div>
  );
};

const AreaChart = ({ color }: { color: string }) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    setHeights(Array.from({ length: 12 }, () => 30 + Math.random() * 60));
  }, []);

  return (
    <div className="h-16 w-full flex items-end gap-1 opacity-60">
      {heights.map((height, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-t-sm hover:opacity-100 transition-opacity", color)}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-ES'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto bg-[#050505] text-slate-100 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505]">

      {/* Header / Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
            <span className="text-cyan-500">OMNI</span>VIEW
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse ml-2" />
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">System Monitor v2.4</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-cyan-400">{time || "--:--:--"}</div>
          <div className="text-xs text-slate-500 font-mono">LIVE FEED</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-80px)]">

        {/* Left Column (Stats) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeonCard title="Red de Equipos" value="45/48" icon={Monitor} color="green">
              <AreaChart color="bg-green-500" />
            </NeonCard>
            <NeonCard title="Cámaras Activas" value="24/24" icon={Video} color="blue">
              <AreaChart color="bg-cyan-500" />
            </NeonCard>
            <NeonCard title="Incidencias" value="3" icon={AlertTriangle} color="red">
              <div className="h-16 flex items-center">
                <div className="w-full bg-red-900/30 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-full w-[15%] rounded-full animate-pulse" />
                </div>
              </div>
            </NeonCard>
          </div>

          {/* Main Visualization (Waveform/Map) */}
          <div className="flex-1 min-h-[300px] relative rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-4 z-10">
              <h2 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                Tráfico de Red en Tiempo Real
              </h2>
              <div className="flex gap-2">
                <span className="w-3 h-1 bg-cyan-500 rounded-full" />
                <span className="w-3 h-1 bg-slate-700 rounded-full" />
                <span className="w-3 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>

            {/* Graph Container */}
            <div className="absolute inset-0 pt-20 px-6 pb-0 flex items-end opacity-60">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 L0 80 Q 10 40 20 70 T 40 60 T 60 85 T 80 50 T 100 70 L 100 100 Z" fill="url(#grad1)" stroke="cyan" strokeWidth="0.5" className="animate-pulse" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'cyan', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: 'cyan', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Overlay Data or Grid Lines */}
            <div className="relative z-10 mt-auto grid grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md">
                <div className="text-xs text-slate-500 mb-1">Upload</div>
                <div className="text-lg font-mono text-cyan-400">450 Mb/s</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md">
                <div className="text-xs text-slate-500 mb-1">Download</div>
                <div className="text-lg font-mono text-blue-400">890 Mb/s</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md">
                <div className="text-xs text-slate-500 mb-1">Ping</div>
                <div className="text-lg font-mono text-green-400">12 ms</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md">
                <div className="text-xs text-slate-500 mb-1">Jitter</div>
                <div className="text-lg font-mono text-slate-300">2 ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Side List) */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
              Sistema
              <Cpu className="w-4 h-4" />
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>CPU Load</span>
                  <span>34%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[34%] bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Memory</span>
                  <span>62%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Storage</span>
                  <span>89%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[89%] bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-800/50" />

          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
              Alertas
              <Bell className="w-4 h-4" />
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex gap-3 items-start group hover:bg-slate-800/60 transition-colors cursor-pointer">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div>
                    <p className="text-xs font-semibold text-slate-300 group-hover:text-white">Conexión inestable</p>
                    <p className="text-[10px] text-slate-500">Servidor-0{i + 1} • Hace {i * 5 + 2}m</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

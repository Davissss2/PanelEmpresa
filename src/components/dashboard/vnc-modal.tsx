"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Keyboard, MousePointer2, Lock, RefreshCw, Power } from "lucide-react";
import { Computer } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface VncModalProps {
    isOpen: boolean;
    onClose: () => void;
    computer: Computer | null;
}

export function VncModal({ isOpen, onClose, computer }: VncModalProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (isOpen && computer) {
            // Simulate connection delay
            const timer = setTimeout(() => setIsConnected(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setIsConnected(false);
            setFullscreen(false);
        }
    }, [isOpen, computer]);

    if (!computer) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    "p-0 overflow-hidden bg-black border-zinc-800 transition-all duration-300",
                    fullscreen
                        ? "w-screen h-screen max-w-none m-0 rounded-none border-none"
                        : "max-w-4xl w-full"
                )}
            >

                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                        <div>
                            <DialogTitle className="text-sm font-medium leading-none text-white">{computer.name} - {computer.ip}</DialogTitle>
                            <p className="text-[10px] text-zinc-400">{isConnected ? 'Conectado (RFB 003.008)' : 'Estableciendo conexión...'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <MousePointer2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <Keyboard className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-4 bg-zinc-700 mx-2" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            <Lock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Power className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-4 bg-zinc-700 mx-2" />
                        <Button variant="ghost" size="icon" onClick={() => setFullscreen(!fullscreen)} className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Viewport */}
                <div className={cn(
                    "relative bg-zinc-950 flex items-center justify-center group overflow-hidden",
                    fullscreen ? "flex-1 h-full" : "aspect-video"
                )}>
                    {!isConnected && (
                        <div className="flex flex-col items-center gap-4 text-zinc-500">
                            <RefreshCw className="w-8 h-8 animate-spin" />
                            <span className="text-sm">Conectando a VNC Server...</span>
                        </div>
                    )}

                    {isConnected && (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
                            {/* Simulated Desktop */}
                            <div className="w-full h-full max-w-[95%] max-h-[95%] bg-[#2d2d2d] shadow-2xl relative rounded-sm overflow-hidden border border-zinc-700">
                                {/* Windows-like Taskbar */}
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#1e1e1e] flex items-center px-2 gap-2 z-20">
                                    <div className="w-6 h-6 bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">W</div>
                                </div>
                                {/* Wallpaper */}
                                <div className="absolute inset-0 bottom-8 bg-[#0078d7] flex items-center justify-center">
                                    <span className="text-white/20 font-bold text-4xl select-none">Escritorio Remoto</span>
                                </div>
                                {/* Window */}
                                <div className="absolute top-10 left-10 w-64 h-48 bg-white shadow-lg rounded-sm border border-zinc-400">
                                    <div className="h-6 bg-white border-b flex items-center px-2 justify-between">
                                        <span className="text-xs">Documento.txt</span>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="bg-zinc-900 px-4 py-1 text-[10px] text-zinc-500 flex justify-between shrink-0">
                    <span>Protocol: Raw</span>
                    <span>Quality: High (True Color)</span>
                    <span>Latency: 15ms</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}

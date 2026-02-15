import { Computer } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Power, Eye, Activity, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComputerCardProps {
    computer: Computer;
    onAction?: () => void;
}

export function ComputerCard({ computer, onAction }: ComputerCardProps) {
    const statusColor = {
        online: "bg-green-500",
        busy: "bg-yellow-500",
        offline: "bg-red-500",
        maintenance: "bg-purple-500",
    };

    const StatusIcon = {
        online: Monitor,
        busy: Activity,
        offline: WifiOff,
        maintenance: Monitor, // Or a wrench icon if available
    }[computer.status];

    return (
        <Card className="overflow-hidden border-muted/40 hover:border-primary/50 transition-all duration-300 group bg-card/50 backdrop-blur-sm">
            <div className="relative aspect-video bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                {/* Placeholder for screen thumbnail */}
                <StatusIcon className={cn("w-12 h-12 text-muted-foreground/50", computer.status === 'online' && "text-green-500/50")} />

                <div className="absolute top-2 right-2">
                    <Badge variant="outline" className={cn("capitalize border-0 text-white font-medium shadow-sm", statusColor[computer.status])}>
                        {computer.status}
                    </Badge>
                </div>

                {/* Overlay Actions on Hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <Button size="sm" variant="secondary" className="gap-2" onClick={onAction}>
                        <Eye className="w-4 h-4" /> Ver
                    </Button>
                    <Button size="sm" variant="destructive" className="gap-2">
                        <Power className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg leading-none">{computer.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{computer.ip}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{computer.department}</Badge>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-1 pb-2">
                {computer.currentUser && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                        {computer.currentUser}
                    </p>
                )}
                {!computer.currentUser && <p className="text-sm text-muted-foreground italic">Sin usuario</p>}
            </CardContent>

            <CardFooter className="p-3 border-t bg-muted/20 flex justify-between text-xs text-muted-foreground">
                <span>MAC: {computer.mac}</span>
                <span>{computer.lastSeen}</span>
            </CardFooter>
        </Card>
    );
}

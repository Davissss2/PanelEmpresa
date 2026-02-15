import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/dashboard/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panel Empresa - Monitorización",
  description: "Sistema de control y monitorización de equipos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark h-full">
      <body className={`${inter.className} h-full bg-[#0f172a] overflow-hidden`}>
        <TooltipProvider>
          <div className="flex h-full w-full">
            <Sidebar />
            <main className="flex-1 h-full overflow-hidden relative">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}

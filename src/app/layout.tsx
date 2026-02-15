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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const observer = new MutationObserver(() => {
                  const portal = document.querySelector('nextjs-portal');
                  if (portal) portal.remove();
                  const toast = document.querySelector('[data-nextjs-toast]');
                  if (toast) toast.remove();
                });
                observer.observe(document.body, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

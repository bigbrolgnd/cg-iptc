"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TwoColumnShell } from "./TwoColumnShell";

interface LayoutShellProps {
    children: ReactNode; // Main Content (Feed)
    recentUpdates?: ReactNode; // Left Panel: Recent Updates list
}

export function LayoutShell({
    children,
    recentUpdates
}: LayoutShellProps) {
    const pathname = usePathname(); // Get current pathname

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans">
            <Navbar pathname={pathname} />

            {/* Desktop View: Two Column Layout */}
            <div className="hidden md:block w-full flex-1">
                <TwoColumnShell leftPanel={recentUpdates}>
                    {children}
                </TwoColumnShell>
            </div>

            {/* Mobile View: Vertical Stack */}
            <div className="block md:hidden w-full flex-1 relative">
                <main className="w-full max-w-screen-2xl mx-auto px-4 py-6 text-lg leading-relaxed">
                    {children}
                    <section className="mt-8 block md:hidden">
                        {recentUpdates}
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
}

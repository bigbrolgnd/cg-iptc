"use client";

import { ReactNode } from "react";

interface TwoColumnShellProps {
    children: ReactNode; // Center: Feed content
    leftPanel?: ReactNode; // Left: Recent Updates
}

export function TwoColumnShell({
    children,
    leftPanel
}: TwoColumnShellProps) {
    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* Left Column: Conditionally render */}
                {leftPanel && (
                    <div className="hidden md:block md:col-span-2">
                        <div className="h-full">
                            {leftPanel}
                        </div>
                    </div>
                )}

                {/* Center Column: Adjust col-span based on leftPanel */}
                <div className={`col-span-1 ${leftPanel ? 'md:col-span-10' : 'md:col-span-12'}`}>
                    <div className="h-full">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}

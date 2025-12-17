"use client";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ReactNode } from "react";

interface SplitShellProps {
    children: ReactNode; // Feed content
    graph: ReactNode;    // Graph component
}

export function SplitShell({ children, graph }: SplitShellProps) {
    return (
        <div className="h-[calc(100vh-10rem)] w-full bg-white md:h-[calc(100vh-8rem)]">
            <Allotment defaultSizes={[60, 40]}>
                <Allotment.Pane minSize={400}>
                    <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                        {children}
                    </div>
                </Allotment.Pane>
                <Allotment.Pane minSize={300}>
                    <div className="h-full w-full bg-white">
                        {graph}
                    </div>
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}

"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";
import { ReactNode } from "react";

interface GraphDrawerProps {
    graph: ReactNode;
}

export function GraphDrawer({ graph }: GraphDrawerProps) {
    return (
        <div className="fixed bottom-6 right-6 md:hidden z-50">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-red-700 text-white shadow-lg hover:bg-red-600 shadow-red-200"
                    >
                        <Network className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] bg-white/95 backdrop-blur">
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-red-700 font-serif">Knowledge Graph</SheetTitle>
                    </SheetHeader>
                    <div className="h-full w-full bg-white">
                        {graph}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

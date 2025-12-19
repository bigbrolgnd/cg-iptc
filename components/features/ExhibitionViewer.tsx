"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import type { ExhibitionAsset } from "@/lib/exhibitions-data";

// Loading component for the dynamic import
function ViewerLoading() {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
        <p className="text-white/50 text-sm">Loading viewer...</p>
      </div>
    </div>
  );
}

// Dynamic import with SSR disabled to prevent react-pdf server-side issues
const DynamicExhibitionViewerContent = dynamic(
  () => import('@/components/features/ExhibitionViewerContent').then(mod => mod.ExhibitionViewerContent),
  {
    ssr: false,
    loading: () => <ViewerLoading />
  }
);

interface ExhibitionViewerProps {
  assets: ExhibitionAsset[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ExhibitionViewer({
  assets,
  selectedIndex,
  onClose,
  onNavigate,
}: ExhibitionViewerProps) {
  return (
    <DynamicExhibitionViewerContent
      assets={assets}
      selectedIndex={selectedIndex}
      onClose={onClose}
      onNavigate={onNavigate}
    />
  );
}

ExhibitionViewer.displayName = "ExhibitionViewer";

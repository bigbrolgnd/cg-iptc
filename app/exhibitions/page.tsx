"use client";

import { useState, useEffect } from "react";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { EmptyState } from "@/components/feed/EmptyState";
import { PdfViewer } from "@/components/features/PdfViewer";
import { ExhibitionSelector } from "@/components/features/ExhibitionSelector";
import { exhibitions, getDefaultExhibition, hasExhibitions } from "@/lib/exhibitions-data";
import type { Exhibition, ExhibitionSeries } from "@/lib/exhibitions-data";
import { cn } from "@/lib/utils";

export default function Exhibitions() {
  const defaultExhibition = getDefaultExhibition();
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | undefined>(
    defaultExhibition
  );
  
  const [selectedSeries, setSelectedSeries] = useState<ExhibitionSeries | undefined>(
    defaultExhibition?.series?.[0]
  );

  useEffect(() => {
    if (selectedExhibition?.series?.length) {
      setSelectedSeries(selectedExhibition.series[0]);
    } else {
        setSelectedSeries(undefined);
    }
  }, [selectedExhibition]);

  if (!hasExhibitions() || !selectedExhibition) {
    return (
      <LayoutShell>
        <EmptyState
          title="No Exhibitions Available"
          message="Check back soon for upcoming exhibitions."
        />
      </LayoutShell>
    );
  }

  const viewerUrl = selectedSeries ? selectedSeries.assetUrl : selectedExhibition.pdfUrl;
  const viewerType = selectedSeries ? selectedSeries.assetType : 'pdf';

  return (
    <LayoutShell>
      <div className="pt-6 pb-12">
        <ExhibitionSelector
          exhibitions={exhibitions}
          selectedExhibition={selectedExhibition}
          onSelect={setSelectedExhibition}
        />
        
        <div className="w-full max-w-4xl mx-auto mb-8">
            {selectedExhibition.series && selectedExhibition.series.length > 0 && (
                <div className="flex gap-6 mb-6 border-b border-zinc-200">
                    {selectedExhibition.series.map(series => (
                        <button
                            key={series.id}
                            onClick={() => setSelectedSeries(series)}
                            className={cn(
                                "pb-3 px-1 text-sm font-medium transition-all relative",
                                selectedSeries?.id === series.id
                                    ? "text-zinc-900 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-900"
                                    : "text-zinc-500 hover:text-zinc-800"
                            )}
                        >
                            {series.title}
                        </button>
                    ))}
                </div>
            )}
            
            {selectedExhibition.summary && (
                <div className="bg-zinc-50 rounded-lg p-6 mb-8 border border-zinc-100">
                    <p className="text-zinc-700 leading-relaxed font-serif text-lg">
                        {selectedExhibition.summary}
                    </p>
                    {/* Inline links to assets */}
                     <div className="flex flex-wrap gap-4 mt-6 text-sm">
                        {selectedExhibition.series?.map(series => (
                             <button
                                key={`link-${series.id}`}
                                onClick={() => setSelectedSeries(series)}
                                className={cn(
                                    "px-3 py-1.5 rounded-md transition-colors border",
                                    selectedSeries?.id === series.id 
                                        ? "bg-zinc-900 text-white border-zinc-900" 
                                        : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-400"
                                )}
                             >
                                View {series.title}
                             </button>
                        ))}
                     </div>
                </div>
            )}
        </div>

        <ErrorBoundary
          fallback={
            <EmptyState
              title="Something went wrong"
              message="We couldn't load the exhibition content. Please try refreshing."
            />
          }
        >
          <PdfViewer
            key={viewerUrl}
            pdfUrl={viewerUrl}
            assetType={viewerType}
          />
        </ErrorBoundary>
      </div>
    </LayoutShell>
  );
}

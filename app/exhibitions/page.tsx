"use client";

import { useState } from "react";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { EmptyState } from "@/components/feed/EmptyState";
import { PdfViewer } from "@/components/features/PdfViewer";
import { ExhibitionSelector } from "@/components/features/ExhibitionSelector";
import { exhibitions, getDefaultExhibition, hasExhibitions } from "@/lib/exhibitions-data";
import type { Exhibition } from "@/lib/exhibitions-data";

export default function Exhibitions() {
  const defaultExhibition = getDefaultExhibition();
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | undefined>(
    defaultExhibition
  );

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

  return (
    <LayoutShell>
      <div className="pt-6">
        <ExhibitionSelector
          exhibitions={exhibitions}
          selectedExhibition={selectedExhibition}
          onSelect={setSelectedExhibition}
        />

        <ErrorBoundary
          fallback={
            <EmptyState
              title="Something went wrong"
              message="We couldn't load the exhibition PDF. Please try refreshing."
            />
          }
        >
          <PdfViewer
            key={selectedExhibition.id}
            pdfUrl={selectedExhibition.pdfUrl}
          />
        </ErrorBoundary>
      </div>
    </LayoutShell>
  );
}

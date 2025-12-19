"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ExhibitionViewer } from "@/components/features/ExhibitionViewer";
import type { Exhibition, ExhibitionAsset } from "@/lib/exhibitions-data";
import { cn } from "@/lib/utils";
import { FileText, Image, ArrowLeft, ChevronRight } from "lucide-react";

interface ExhibitionDetailViewProps {
  exhibition: Exhibition;
}

export function ExhibitionDetailView({ exhibition }: ExhibitionDetailViewProps) {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    assetIndex: number;
  } | null>(null);
  const [activeSeriesId, setActiveSeriesId] = useState<string | null>(null);
  const scrollPositionRef = useRef(0);

  // Create flat list of all navigable assets
  const allAssets = useMemo(() => {
    const assets: ExhibitionAsset[] = [];

    // Add curatorial statements first
    exhibition.curatorialStatements.forEach((stmt) => {
      assets.push({
        id: stmt.id,
        title: stmt.title,
        description: stmt.description,
        assetUrl: stmt.pdfUrl,
        assetType: 'pdf',
      });
    });

    // Add all series assets
    exhibition.series.forEach((series) => {
      series.assets.forEach((asset) => {
        assets.push(asset);
      });
    });

    return assets;
  }, [exhibition]);

  // Open viewer for a specific asset
  const openViewer = useCallback((assetId: string) => {
    const index = allAssets.findIndex((a) => a.id === assetId);
    if (index !== -1) {
      scrollPositionRef.current = window.scrollY;
      setViewerState({ isOpen: true, assetIndex: index });
    }
  }, [allAssets]);

  // Navigate within viewer
  const navigateViewer = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < allAssets.length) {
      setViewerState({ isOpen: true, assetIndex: newIndex });
    }
  }, [allAssets.length]);

  // Close viewer
  const closeViewer = useCallback(() => {
    setViewerState(null);
    // Restore scroll position after modal closes
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  }, []);

  // Get currently selected asset for highlighting
  const selectedAssetId = viewerState ? allAssets[viewerState.assetIndex]?.id : null;

  return (
    <div className="pt-6 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link
            href="/exhibitions"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exhibitions
          </Link>
        </nav>

        {/* Exhibition Header */}
        <header className="mb-8">
          {exhibition.subtitle && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">
              {exhibition.subtitle}
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            {exhibition.title}
          </h1>
          {exhibition.summary && (
            <div className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
              <p className="text-zinc-700 leading-relaxed font-serif text-lg">
                {exhibition.summary}
              </p>
            </div>
          )}
        </header>

        {/* Curatorial Statements Section */}
        <section className="mb-10">
          <h2 className="font-serif text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-zinc-600" />
            Curatorial Statements
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exhibition.curatorialStatements.map((statement) => (
              <button
                key={statement.id}
                onClick={() => openViewer(statement.id)}
                className={cn(
                  "text-left p-5 rounded-xl border transition-all duration-200 group",
                  selectedAssetId === statement.id
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-3">
                  <FileText
                    className={cn(
                      "w-5 h-5 flex-shrink-0 mt-0.5",
                      selectedAssetId === statement.id
                        ? "text-zinc-300"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    )}
                  />
                  <div>
                    <h3
                      className={cn(
                        "font-semibold mb-1",
                        selectedAssetId === statement.id
                          ? "text-white"
                          : "text-zinc-900"
                      )}
                    >
                      {statement.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm",
                        selectedAssetId === statement.id
                          ? "text-zinc-300"
                          : "text-zinc-500"
                      )}
                    >
                      {statement.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Series Sections */}
        <section>
          <h2 className="font-serif text-xl font-bold text-zinc-900 mb-6">
            Series
          </h2>

          {exhibition.series.map((series) => (
            <div key={series.id} className="mb-8">
              {/* Series Header */}
              <button
                onClick={() => setActiveSeriesId(
                  activeSeriesId === series.id ? null : series.id
                )}
                className="w-full flex items-center justify-between p-4 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors mb-4"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-zinc-900">{series.title}</h3>
                  {series.description && (
                    <p className="text-sm text-zinc-600 mt-1">{series.description}</p>
                  )}
                  <span className="text-xs text-zinc-500 mt-2 block">
                    {series.assets.length} asset{series.assets.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ChevronRight
                  className={cn(
                    "w-5 h-5 text-zinc-500 transition-transform",
                    activeSeriesId === series.id && "rotate-90"
                  )}
                />
              </button>

              {/* Series Assets - Only show when this specific series is active */}
              {activeSeriesId === series.id && (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {series.assets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => openViewer(asset.id)}
                      className={cn(
                        "text-left p-4 rounded-lg border transition-all duration-200 group",
                        selectedAssetId === asset.id
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-sm"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {asset.assetType === 'pdf' ? (
                          <FileText
                            className={cn(
                              "w-5 h-5 flex-shrink-0",
                              selectedAssetId === asset.id
                                ? "text-zinc-300"
                                : "text-red-500"
                            )}
                          />
                        ) : (
                          <Image
                            className={cn(
                              "w-5 h-5 flex-shrink-0",
                              selectedAssetId === asset.id
                                ? "text-zinc-300"
                                : "text-blue-500"
                            )}
                          />
                        )}
                        <div className="min-w-0">
                          <h4
                            className={cn(
                              "font-medium text-sm truncate",
                              selectedAssetId === asset.id
                                ? "text-white"
                                : "text-zinc-900"
                            )}
                          >
                            {asset.title}
                          </h4>
                          {asset.description && (
                            <p
                              className={cn(
                                "text-xs mt-1 line-clamp-2",
                                selectedAssetId === asset.id
                                  ? "text-zinc-300"
                                  : "text-zinc-500"
                              )}
                            >
                              {asset.description}
                            </p>
                          )}
                          <span
                            className={cn(
                              "inline-block text-xs mt-2 px-2 py-0.5 rounded-full",
                              selectedAssetId === asset.id
                                ? "bg-zinc-800 text-zinc-300"
                                : asset.assetType === 'pdf'
                                  ? "bg-red-50 text-red-600"
                                  : "bg-blue-50 text-blue-600"
                            )}
                          >
                            {asset.assetType.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Full-screen Viewer Modal */}
      {viewerState && (
        <ErrorBoundary
          fallback={
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <p className="font-semibold mb-2">Something went wrong</p>
                <button
                  onClick={closeViewer}
                  className="text-white/70 hover:text-white underline"
                >
                  Close viewer
                </button>
              </div>
            </div>
          }
        >
          <ExhibitionViewer
            assets={allAssets}
            selectedIndex={viewerState.assetIndex}
            onClose={closeViewer}
            onNavigate={navigateViewer}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

ExhibitionDetailView.displayName = "ExhibitionDetailView";

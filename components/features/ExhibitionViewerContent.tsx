"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, ZoomIn, ZoomOut } from "lucide-react";
import { AssetViewerModal } from "@/components/ui/AssetViewerModal";
import type { ExhibitionAsset } from "@/lib/exhibitions-data";

// Set up the worker - using jsdelivr CDN (backed by Cloudflare, more reliable than unpkg)
// pdfjs-dist 5.x uses .mjs extension
pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ExhibitionViewerProps {
  assets: ExhibitionAsset[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2 className="w-8 h-8 text-white/50 animate-spin" aria-hidden="true" />
      <p className="text-white/50 text-sm">Loading...</p>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
      <AlertCircle className="w-10 h-10 text-red-400" aria-hidden="true" />
      <div>
        <p className="text-white font-semibold">Failed to load content</p>
        <p className="text-white/50 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}

export function ExhibitionViewerContent({
  assets,
  selectedIndex,
  onClose,
  onNavigate,
}: ExhibitionViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [scale, setScale] = useState(1.0);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const currentAsset = assets[selectedIndex];
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < assets.length - 1;

  // Reset state when switching assets
  useEffect(() => {
    setPageNumber(1);
    setNumPages(null);
    setError(null);
    setScale(1.0);
    setImageError(false);
    setImageLoading(true);
  }, [selectedIndex]);

  // Calculate responsive width based on viewport
  const updateWidth = useCallback(() => {
    // Mobile: 32px total padding (16px each side)
    // Desktop: 160px total padding (80px each side for navigation arrows)
    const isMobile = window.innerWidth < 768;
    const padding = isMobile ? 32 : 160;
    const maxWidth = Math.min(window.innerWidth - padding, 1200);
    setContainerWidth(maxWidth);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    setError(err.message || "Unable to load the PDF document.");
    setNumPages(null);
  }

  const previousPage = useCallback(() => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }, []);

  const nextPage = useCallback(() => {
    if (numPages) {
      setPageNumber((prev) => Math.min(numPages, prev + 1));
    }
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  // Handle keyboard for PDF page navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentAsset?.assetType === 'pdf' && numPages && numPages > 1) {
        if (e.key === 'ArrowUp' && pageNumber > 1) {
          e.preventDefault();
          previousPage();
        } else if (e.key === 'ArrowDown' && pageNumber < numPages) {
          e.preventDefault();
          nextPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAsset?.assetType, numPages, pageNumber, previousPage, nextPage]);

  /**
   * Prevents right-click context menu on exhibition assets.
   * This discourages casual downloading of curated art/documents.
   * Note: Users can still access assets via DevTools - this is a soft deterrent only.
   * To disable: remove onContextMenu handlers from image and PDF containers below.
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handlePrev = () => {
    if (hasPrev) {
      onNavigate(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigate(selectedIndex + 1);
    }
  };

  if (!currentAsset) return null;

  const renderContent = () => {
    if (currentAsset.assetType === 'image') {
      if (imageError) {
        return <ErrorDisplay message="Unable to load the image." />;
      }

      return (
        <div
          className="w-full h-full flex items-center justify-center relative"
          onContextMenu={handleContextMenu}
        >
          {imageLoading && <LoadingSpinner />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentAsset.assetUrl}
            alt={currentAsset.title}
            className={`max-w-full max-h-[80vh] w-auto h-auto object-contain select-none transition-opacity duration-200 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            draggable={false}
          />
        </div>
      );
    }

    // PDF rendering
    if (error) {
      return <ErrorDisplay message={error} />;
    }

    return (
      <div
        className="w-full flex flex-col items-center gap-4"
        onContextMenu={handleContextMenu}
      >
        {/* PDF Container - allow horizontal scroll when zoomed */}
        <div className="overflow-auto max-h-[70vh] w-full flex justify-center select-none bg-black/20 rounded-lg backdrop-blur-sm">
          <Document
            file={currentAsset.assetUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingSpinner />}
            error={<ErrorDisplay message="The PDF could not be loaded." />}
            className="flex justify-center p-4"
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              scale={scale}
              loading={<LoadingSpinner />}
              error={<ErrorDisplay message="This page could not be rendered." />}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl"
            />
          </Document>
        </div>

        {/* PDF Controls: Navigation + Zoom */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-2 bg-black/40 rounded-full px-6 backdrop-blur-md border border-white/10">
          
          {/* Page Navigation */}
          {numPages && numPages > 1 && (
            <div className="flex items-center gap-2 border-r border-white/20 pr-4 mr-2">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                aria-label="Go to previous page"
                className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              <p className="text-sm text-white/90 font-mono tabular-nums min-w-[80px] text-center">
                {pageNumber} / {numPages}
              </p>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                aria-label="Go to next page"
                className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              aria-label="Zoom out"
              className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-xs text-white/70 font-mono w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 3.0}
              aria-label="Zoom in"
              className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AssetViewerModal
      isOpen={true}
      onClose={onClose}
      title={currentAsset.title}
      subtitle={currentAsset.description}
      onPrev={handlePrev}
      onNext={handleNext}
      hasPrev={hasPrev}
      hasNext={hasNext}
      currentIndex={selectedIndex}
      totalCount={assets.length}
    >
      {renderContent()}
    </AssetViewerModal>
  );
}

ExhibitionViewerContent.displayName = "ExhibitionViewerContent";

"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
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
    setImageError(false);
    setImageLoading(true);
  }, [selectedIndex]);

  // Calculate responsive width based on viewport
  const updateWidth = useCallback(() => {
    // Account for modal padding and navigation arrows
    const maxWidth = Math.min(window.innerWidth - 160, 900);
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
        <div className="overflow-auto max-h-[70vh] select-none">
          <Document
            file={currentAsset.assetUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<LoadingSpinner />}
            error={<ErrorDisplay message="The PDF could not be loaded." />}
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              loading={<LoadingSpinner />}
              error={<ErrorDisplay message="This page could not be rendered." />}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        {/* PDF Page Navigation */}
        {numPages && numPages > 1 && (
          <div className="flex items-center gap-4 py-2">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              aria-label="Go to previous page"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
            <p className="text-sm text-white/70 min-w-[100px] text-center tabular-nums">
              Page {pageNumber} of {numPages}
            </p>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              aria-label="Go to next page"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
          </div>
        )}
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// Text and annotation layers disabled to prevent downloads
import { ChevronLeft, ChevronRight, AlertCircle, Loader2, FileText, ExternalLink } from "lucide-react";

// Set up the worker - pdfjs-dist 5.x uses .mjs extension
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ExhibitionDetailProps {
  pdfUrl: string;
  assetType?: 'pdf' | 'image';
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" aria-hidden="true" />
      <p className="text-zinc-500 text-sm">Loading exhibition...</p>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
      <AlertCircle className="w-10 h-10 text-red-500" aria-hidden="true" />
      <div>
        <p className="text-zinc-900 font-semibold">Failed to load content</p>
        <p className="text-zinc-500 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}

export function ExhibitionDetail({ pdfUrl, assetType = 'pdf' }: ExhibitionDetailProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate responsive width based on container
  const updateWidth = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth - 32, 800); // 16px padding on each side
    setContainerWidth(maxWidth);
    
    // Check if device is mobile/tablet based on width (standard tablet breakpoint is often 768px or 1024px)
    // Using 768px as a safe cutoff for "small screens" that benefit from native zoom
    // Also checking user agent for better accuracy if needed, but width is usually sufficient for responsive layout logic
    setIsMobile(window.innerWidth < 1024); 
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
    setError(err.message || "Unable to load the PDF document. Please try again later.");
    setNumPages(null);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // Prevent right-click context menu to discourage downloads
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  if (assetType === 'image') {
    // Mobile/Tablet: Open image in new tab for native zoom
    if (isMobile) {
      return (
        <div className="w-full flex flex-col items-center gap-6 py-12 px-4 text-center">
          <div className="p-6 bg-zinc-50 rounded-full">
              <FileText className="w-12 h-12 text-zinc-400" />
          </div>
          <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">View Exhibition Image</h3>
              <p className="text-zinc-500 max-w-sm mx-auto mb-6">
                  Open the image in full-screen mode to zoom and view details on your device.
              </p>
              <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
              >
                  Open Image
                  <ExternalLink className="w-4 h-4" />
              </a>
          </div>
        </div>
      );
    }

    return (
      <div
        className="w-full flex flex-col items-center gap-4 py-8"
        onContextMenu={handleContextMenu}
      >
        <div className="w-full max-w-4xl mx-auto overflow-hidden select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pdfUrl}
            alt="Exhibition content"
            className="w-full h-auto object-contain pointer-events-none"
            onError={() => setError("Unable to load the image.")}
            draggable={false}
          />
        </div>
      </div>
    );
  }

  // Mobile/Tablet View: Button to open native PDF viewer
  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center gap-6 py-12 px-4 text-center">
        <div className="p-6 bg-zinc-50 rounded-full">
            <FileText className="w-12 h-12 text-zinc-400" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">View Exhibition PDF</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mb-6">
                Open the PDF in full-screen mode to zoom and read comfortably on your device.
            </p>
            <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
            >
                Open PDF
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-4 py-8"
      onContextMenu={handleContextMenu}
    >
      <div className="w-full max-w-4xl mx-auto overflow-hidden select-none">
        <Document
          file={pdfUrl}
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

      {numPages && numPages > 1 && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            aria-label="Go to previous page"
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <p className="text-sm text-zinc-600 min-w-[100px] text-center">
            Page {pageNumber} of {numPages}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            aria-label="Go to next page"
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

ExhibitionDetail.displayName = "ExhibitionDetail";

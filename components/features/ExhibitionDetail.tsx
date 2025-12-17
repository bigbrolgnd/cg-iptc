"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Set up the worker
// This is required by react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ExhibitionDetailProps {
  pdfUrl: string;
}

export function ExhibitionDetail({ pdfUrl }: ExhibitionDetailProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
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

  return (
    <div className="w-full flex flex-col items-center gap-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page pageNumber={pageNumber} width={800} />
        </Document>
      </div>

      {numPages && numPages > 1 && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import dynamic from 'next/dynamic';

const DynamicExhibitionDetail = dynamic(() => import('@/components/features/ExhibitionDetail').then(mod => mod.ExhibitionDetail), {
  ssr: false,
  loading: () => <p>Loading PDF...</p>
});

interface PdfViewerProps {
    pdfUrl: string;
}

export function PdfViewer({ pdfUrl }: PdfViewerProps) {
    return <DynamicExhibitionDetail pdfUrl={pdfUrl} />;
}

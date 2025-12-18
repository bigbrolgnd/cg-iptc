
"use client";

import dynamic from 'next/dynamic';

const DynamicExhibitionDetail = dynamic(() => import('@/components/features/ExhibitionDetail').then(mod => mod.ExhibitionDetail), {
  ssr: false,
  loading: () => <p>Loading content...</p>
});

interface PdfViewerProps {
    pdfUrl: string;
    assetType?: 'pdf' | 'image';
}

export function PdfViewer({ pdfUrl, assetType = 'pdf' }: PdfViewerProps) {
    return <DynamicExhibitionDetail pdfUrl={pdfUrl} assetType={assetType} />;
}

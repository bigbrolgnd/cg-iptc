


import { LayoutShell } from "@/components/layout/LayoutShell";

import { ErrorBoundary } from "@/components/ErrorBoundary";

import { EmptyState } from "@/components/feed/EmptyState";

import { PdfViewer } from "@/components/features/PdfViewer";



export default function Exhibitions() {

  const pdfUrl = "/exhibitions/CG-IPTC_Exhibit_The_Technologization_of_Counterinsurgency_Final.pdf";



  return (

    <LayoutShell>

      <ErrorBoundary

        fallback={

          <EmptyState

            title="Something went wrong"

            message="We couldn't load the exhibition PDF. Please try refreshing."

          />

        }

      >

        <PdfViewer pdfUrl={pdfUrl} />

      </ErrorBoundary>

    </LayoutShell>

  );

}

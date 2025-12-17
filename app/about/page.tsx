
import { LayoutShell } from "@/components/layout/LayoutShell";
import { AboutPage } from "@/components/templates/AboutPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { EmptyState } from "@/components/feed/EmptyState";

export default function About() {
  return (
    <LayoutShell>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Something went wrong"
            message="We couldn't load the page content. Please try refreshing."
          />
        }
      >
        <AboutPage />
      </ErrorBoundary>
    </LayoutShell>
  );
}

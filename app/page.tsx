import { LayoutShell } from "@/components/layout/LayoutShell";
import { HeroArticle } from "@/components/feed/HeroArticle";
import { RecentUpdatesList } from "@/components/feed/RecentUpdatesList";
import { EmptyState } from "@/components/feed/EmptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { fetchSubstackFeed } from "@/lib/substack-parser";
import { SubstackItem } from "@/types/substack";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const feed = await fetchSubstackFeed();
    if (feed && feed.items.length > 0) {
      const latest = feed.items[0];
      return {
        title: latest.title,
        description: latest.summary || "Latest updates from the Clay-Gilmore Institute.",
        openGraph: {
          images: latest.image ? [latest.image] : ["/og-image.png"],
        }
      };
    }
  } catch (e) {
    // console.error("Metadata fetch failed", e);
  }
  return {};
}

export default async function Home() {
  // Fetch full feed at build time (SSG)
  let heroArticle: SubstackItem | null = null;
  let recentArticles: SubstackItem[] = [];

  try {
    const feed = await fetchSubstackFeed();
    if (feed && feed.items.length > 0) {
      heroArticle = feed.items[0];
      recentArticles = feed.items.slice(1, 6);
    }
  } catch (error) {
    console.error("Failed to load feed:", error);
  }

  return (
    <LayoutShell recentUpdates={<RecentUpdatesList articles={recentArticles} />}>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Something went wrong"
            message="We couldn't load the article. Please try refreshing the page."
          />
        }
      >
        {heroArticle ? (
          <HeroArticle article={heroArticle} />
        ) : (
          <EmptyState
            title="Welcome to the Clay-Gilmore Institute"
            message="The latest articles will appear here once the Substack feed is connected."
          />
        )}
      </ErrorBoundary>
    </LayoutShell>
  );
}

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
      const heroArticle = feed.items[0];
      
      return {
        title: heroArticle.title,
        description: heroArticle.summary,
        openGraph: {
          title: heroArticle.title,
          description: heroArticle.summary,
          images: heroArticle.image ? [{ url: heroArticle.image }] : undefined,
          type: "article",
          publishedTime: heroArticle.pubDate,
        },
        twitter: {
          card: "summary_large_image",
          title: heroArticle.title,
          description: heroArticle.summary,
          images: heroArticle.image ? [heroArticle.image] : undefined,
        },
      };
    }
  } catch (error) {
    console.error("Failed to generate metadata from feed:", error);
  }

  // Fallback to default metadata if feed fails or is empty
  return {
    title: "Home",
    description: "Research, analysis, and discourse on anticolonial thought, philosophy, and technology.",
  };
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

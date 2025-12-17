/**
 * HeroSkeleton component displays a loading placeholder for the Hero article.
 * Used for loading states in client-side fetching scenarios.
 * Light newspaper theme with subtle animated pulse.
 */
export function HeroSkeleton() {
  return (
    <article className="flex flex-col gap-6 mx-auto max-w-2xl py-8 animate-pulse">
      {/* Header skeleton */}
      <header className="space-y-4 px-6">
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-10 md:h-12 bg-zinc-200 rounded w-3/4" />
          <div className="h-10 md:h-12 bg-zinc-200 rounded w-1/2" />
        </div>
        {/* Date skeleton */}
        <div className="h-4 bg-zinc-100 rounded w-40" />
      </header>

      {/* Image skeleton */}
      <div className="px-6">
        <div className="w-full h-64 bg-zinc-200 rounded-lg" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 px-6">
        {/* Lead paragraph */}
        <div className="h-6 bg-zinc-200 rounded w-full" />
        <div className="h-6 bg-zinc-200 rounded w-5/6" />
        <div className="h-6 bg-zinc-200 rounded w-4/5" />

        {/* Body paragraphs */}
        <div className="space-y-2 mt-6">
          <div className="h-4 bg-zinc-100 rounded w-full" />
          <div className="h-4 bg-zinc-100 rounded w-full" />
          <div className="h-4 bg-zinc-100 rounded w-3/4" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-100 rounded w-full" />
          <div className="h-4 bg-zinc-100 rounded w-5/6" />
        </div>
      </div>

      {/* Link skeleton */}
      <div className="px-6 pt-4">
        <div className="h-5 bg-red-100 rounded w-36" />
      </div>
    </article>
  );
}

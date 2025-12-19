"use client";

import { useState } from 'react';
import { SubstackItem } from '@/types/substack';
import { formatDateLong } from '@/lib/utils';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ImageModal } from '@/components/ui/ImageModal';

interface HeroArticleProps {
  article: SubstackItem;
}

/**
 * HeroArticle component displays the latest Substack article prominently.
 * Features collapsible content with a preview of the first 500 words.
 * Truncation is handled on the server to prevent hydration mismatches and client-side crashes.
 */
export function HeroArticle({ article }: HeroArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const formattedDate = formatDateLong(article.pubDate);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      e.preventDefault();
      const img = target as HTMLImageElement;
      setSelectedImage(img.src);
    }
  };

  const displayContent = isExpanded ? article.content : (article.previewContent || article.content);

  return (
    <article
      className="flex flex-col gap-4 mx-auto w-full max-w-none py-8 md:ml-[15px]"
      aria-labelledby="hero-article-title"
    >
      {/* Header: Title - offset left on desktop to center on full page */}
      <header className="px-6">
        <div className="md:-ml-[8.33%] md:pr-[8.33%]">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <h1
              id="hero-article-title"
              className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 tracking-tight group-hover:text-red-700 transition-colors text-center"
            >
              {article.title}
            </h1>
          </a>
        </div>
      </header>

      {/* Featured Image (if available) - offset left on desktop to center on full page */}
      {article.image && (
        <div className="px-6">
          <div className="md:-ml-[8.33%] md:pr-[8.33%]">
            <img
              src={article.image}
              alt={`Featured image for ${article.title}`}
              className="w-full max-w-xl mx-auto h-auto rounded-lg border border-zinc-200 shadow-sm cursor-zoom-in hover:opacity-95 transition-opacity"
              loading="eager"
              fetchPriority="high"
              onClick={() => setSelectedImage(article.image || null)}
            />
          </div>
        </div>
      )}

      {/* Date */}
      <div className="px-6">
        <time
          dateTime={article.pubDate}
          className="block text-red-700 font-mono text-sm uppercase tracking-wider"
        >
          {formattedDate}
        </time>
      </div>

      {/* Summary/Description as subtitle */}
      {article.summary && (
        <div className="px-6">
          <p className="text-lg text-zinc-600 leading-relaxed">
            {article.summary}
          </p>
        </div>
      )}

      {/* Collapsible Content Section */}
      {article.content && (
        <div className="px-6 pb-6">
          {/* Content Area */}
          <div
            id="article-content"
            className="relative md:pr-[8.33%]"
          >
            {/* Gradient Mask for collapsed state */}
            {!isExpanded && article.isTruncated && (
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            )}

            {/* Article Preview/Full Content */}
            <div
              className={`prose prose-zinc prose-lg max-w-none
                         prose-p:my-6 prose-p:leading-relaxed
                         prose-headings:mt-10 prose-headings:mb-6 prose-headings:text-zinc-900
                         [&_p:empty]:min-h-[1.5em] [&_p:empty]:my-4
                         [&_p+p]:mt-6 [&_br]:block [&_br]:my-4
                         [&_img]:cursor-zoom-in overflow-hidden transition-all duration-500
                         ${!isExpanded && article.isTruncated ? 'max-h-64' : 'max-h-[none]'}`}
              dangerouslySetInnerHTML={{ __html: displayContent }}
              onClick={handleContentClick}
            />

            {/* Continue Reading CTA - shown when expanded */}
            {isExpanded && article.isTruncated && (
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <p className="text-zinc-500 text-sm mb-4">
                  Continue reading the full article on Substack...
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Read full article on Substack
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Expand/Collapse Toggle */}
          {article.isTruncated && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-zinc-500 hover:text-red-700 transition-colors text-sm font-medium px-4 py-2 rounded-full border border-zinc-200 hover:border-red-700 hover:bg-red-50 z-20 relative"
                aria-expanded={isExpanded}
                aria-controls="article-content"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    Collapse preview
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    Show preview
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <ImageModal
        src={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </article>
  );
}

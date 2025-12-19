'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface AssetViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  // Navigation
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  // Position indicator
  currentIndex?: number;
  totalCount?: number;
}

export function AssetViewerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalCount,
}: AssetViewerModalProps) {
  const [mounted, setMounted] = useState(false);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev && onPrev) {
            e.preventDefault();
            onPrev();
          }
          break;
        case 'ArrowRight':
          if (hasNext && onNext) {
            e.preventDefault();
            onNext();
          }
          break;
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Add keyboard listeners
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted || !isOpen) return null;

  const showPositionIndicator =
    typeof currentIndex === 'number' && typeof totalCount === 'number';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 animate-in fade-in duration-200"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close viewer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="flex-1 text-center px-4 min-w-0">
          <h2
            id="viewer-title"
            className="text-white font-medium truncate text-sm md:text-base"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/50 text-xs truncate">{subtitle}</p>
          )}
        </div>

        {/* Position indicator */}
        <div className="min-w-[60px] text-right">
          {showPositionIndicator && (
            <span className="text-white/50 text-sm tabular-nums">
              {currentIndex + 1} / {totalCount}
            </span>
          )}
        </div>
      </header>

      {/* Main content area with navigation */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Previous button */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            'absolute left-2 md:left-4 z-10 p-3 md:p-4 rounded-full transition-all',
            hasPrev
              ? 'text-white/70 hover:text-white hover:bg-white/10 cursor-pointer'
              : 'text-white/20 cursor-not-allowed'
          )}
          aria-label="Previous asset"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        {/* Content */}
        <div className="flex-1 h-full flex items-center justify-center px-16 md:px-24 py-4 overflow-auto">
          {children}
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            'absolute right-2 md:right-4 z-10 p-3 md:p-4 rounded-full transition-all',
            hasNext
              ? 'text-white/70 hover:text-white hover:bg-white/10 cursor-pointer'
              : 'text-white/20 cursor-not-allowed'
          )}
          aria-label="Next asset"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>

      {/* Screen reader live region for navigation announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {showPositionIndicator
          ? `Now viewing: ${title}. ${currentIndex + 1} of ${totalCount}.`
          : `Now viewing: ${title}.`}
      </div>
    </div>,
    document.body
  );
}

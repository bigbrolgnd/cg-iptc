import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

/**
 * EmptyState component displays a friendly message when no articles are available.
 * Light newspaper theme styling.
 */
export function EmptyState({
  title = 'No Articles Yet',
  message = 'Check back soon for the latest content.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-2xl py-16 px-6 text-center">
      <div className="p-4 rounded-full bg-zinc-100 border border-zinc-200">
        <FileQuestion className="w-12 h-12 text-zinc-400" />
      </div>
      <header className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-zinc-900">
          {title}
        </h2>
        <p className="text-zinc-500 max-w-md">
          {message}
        </p>
      </header>
    </div>
  );
}

'use client';

import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-serif font-bold text-zinc-900 mb-2">
            Critical System Error
          </h1>
          
          <p className="text-zinc-600 mb-8 leading-relaxed">
            A critical error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>

          <button
            onClick={() => reset()}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Refresh Page
          </button>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 pt-6 border-t border-zinc-100 text-left">
              <p className="text-xs font-mono text-red-500 overflow-auto max-h-32">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

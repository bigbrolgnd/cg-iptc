'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">
          Something went wrong
        </h2>
        
        <p className="text-zinc-600 mb-8 leading-relaxed">
          The application encountered an unexpected error. We've been notified and are looking into it.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          
          <a
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Return to homepage
          </a>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 pt-6 border-t border-zinc-100 text-left">
            <p className="text-xs font-mono text-red-500 overflow-auto max-h-32">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

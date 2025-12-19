'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  src: string | null;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ src, alt = 'Image preview', isOpen, onClose }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Close on escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !src) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors z-60"
        aria-label="Close image preview"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="relative max-w-full max-h-full overflow-hidden flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        />
      </div>
    </div>,
    document.body
  );
}

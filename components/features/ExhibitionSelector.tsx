"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Exhibition } from "@/lib/exhibitions-data";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText } from "lucide-react";

interface ExhibitionSelectorProps {
  exhibitions: Exhibition[];
  selectedExhibition: Exhibition;
  onSelect: (exhibition: Exhibition) => void;
}

export function ExhibitionSelector({
  exhibitions,
  selectedExhibition,
  onSelect,
}: ExhibitionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, exhibitions.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          event.preventDefault();
          setFocusedIndex(exhibitions.length - 1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < exhibitions.length) {
            onSelect(exhibitions[focusedIndex]);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
      }
    },
    [isOpen, focusedIndex, exhibitions, onSelect]
  );

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  // Single exhibition display (no dropdown needed)
  if (exhibitions.length <= 1) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-6">
        <a
          href={selectedExhibition.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <FileText className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors flex-shrink-0" aria-hidden="true" />
          <div>
            <h2 className="font-semibold text-zinc-900 font-serif text-lg group-hover:underline decoration-zinc-400 underline-offset-4">
              {selectedExhibition.title}
            </h2>
            {selectedExhibition.subtitle && (
              <p className="text-sm text-zinc-600">{selectedExhibition.subtitle}</p>
            )}
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-6" ref={containerRef}>
      <label
        htmlFor="exhibition-selector"
        className="block text-sm font-medium text-zinc-700 mb-2"
      >
        Select an Exhibition
      </label>
      <div className="relative">
        <button
          id="exhibition-selector"
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setFocusedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? "exhibition-listbox" : undefined}
          className={cn(
            "w-full flex items-center justify-between gap-3 p-4",
            "bg-white border border-zinc-300 rounded-lg",
            "hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2",
            "transition-colors"
          )}
        >
          <div className="flex items-center gap-3 text-left">
            <FileText className="w-5 h-5 text-zinc-600 flex-shrink-0" aria-hidden="true" />
            <div>
              <span className="font-semibold text-zinc-900 font-serif">
                {selectedExhibition.title}
              </span>
              {selectedExhibition.subtitle && (
                <span className="block text-sm text-zinc-600">
                  {selectedExhibition.subtitle}
                </span>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-zinc-500 transition-transform",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            id="exhibition-listbox"
            ref={listRef}
            role="listbox"
            aria-label="Available exhibitions"
            aria-activedescendant={focusedIndex >= 0 ? `exhibition-option-${focusedIndex}` : undefined}
            className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto"
          >
            {exhibitions.map((exhibition, index) => (
              <li
                key={exhibition.id}
                id={`exhibition-option-${index}`}
                role="option"
                aria-selected={exhibition.id === selectedExhibition.id}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelect(exhibition);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={cn(
                    "w-full text-left p-4 transition-colors",
                    "focus:outline-none",
                    focusedIndex === index && "bg-zinc-100",
                    focusedIndex !== index && exhibition.id === selectedExhibition.id && "bg-zinc-50",
                    focusedIndex !== index && exhibition.id !== selectedExhibition.id && "hover:bg-zinc-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className={cn(
                        "w-5 h-5 flex-shrink-0 mt-0.5",
                        exhibition.id === selectedExhibition.id
                          ? "text-zinc-900"
                          : "text-zinc-400"
                      )}
                      aria-hidden="true"
                    />
                    <div>
                      <span
                        className={cn(
                          "font-semibold font-serif block",
                          exhibition.id === selectedExhibition.id
                            ? "text-zinc-900"
                            : "text-zinc-700"
                        )}
                      >
                        {exhibition.title}
                      </span>
                      {exhibition.subtitle && (
                        <span className="text-sm text-zinc-500 block">
                          {exhibition.subtitle}
                        </span>
                      )}
                      <span className="text-sm text-zinc-500 mt-1 block line-clamp-2">
                        {exhibition.description}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

ExhibitionSelector.displayName = "ExhibitionSelector";

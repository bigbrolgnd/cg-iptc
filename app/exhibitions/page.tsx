"use client";

import Link from "next/link";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { EmptyState } from "@/components/feed/EmptyState";
import { exhibitions, hasExhibitions } from "@/lib/exhibitions-data";
import { ArrowRight, Calendar } from "lucide-react";

export default function Exhibitions() {
  if (!hasExhibitions()) {
    return (
      <LayoutShell>
        <EmptyState
          title="No Exhibitions Available"
          message="Check back soon for upcoming exhibitions."
        />
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              Exhibitions
            </h1>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our collection of exhibitions examining surveillance, technology,
              and their implications for civil liberties.
            </p>
          </header>

          {/* Exhibition Cards */}
          <div className="grid gap-6">
            {exhibitions.map((exhibition) => (
              <Link
                key={exhibition.id}
                href={`/exhibitions/${exhibition.id}`}
                className="group block bg-white border border-zinc-200 rounded-xl p-6 md:p-8 hover:border-zinc-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {exhibition.subtitle && (
                      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">
                        {exhibition.subtitle}
                      </span>
                    )}
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors">
                      {exhibition.title}
                    </h2>
                    <p className="text-zinc-600 leading-relaxed mb-4 line-clamp-3">
                      {exhibition.description}
                    </p>

                    {/* Exhibition Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exhibition.date}
                      </span>
                      <span className="text-zinc-300">|</span>
                      <span>{exhibition.curatorialStatements.length} Curatorial Statement{exhibition.curatorialStatements.length !== 1 ? 's' : ''}</span>
                      <span className="text-zinc-300">|</span>
                      <span>{exhibition.series.length} Series</span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex-shrink-0 p-3 rounded-full bg-zinc-100 group-hover:bg-zinc-900 transition-colors">
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

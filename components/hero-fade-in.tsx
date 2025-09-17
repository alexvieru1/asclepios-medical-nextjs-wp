// components/hero-fade-in.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
  intervalMs?: number;
  className?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  rounded?: string;
};

export default function HeroFadeCarousel({
  images,
  intervalMs = 5000,
  className = "",
  showControls = true,
  showIndicators = true,
  rounded = "rounded-2xl",
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const len = images.length || 0;
  const safeIndex = ((index % len) + len) % len;

  React.useEffect(() => {
    if (len < 2 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % len), intervalMs);
    return () => clearInterval(id);
  }, [len, paused, intervalMs]);

  const go = (next: number) => setIndex(((next % len) + len) % len);
  const prev = () => go(safeIndex - 1);
  const next = () => go(safeIndex + 1);

  return (
    <div
      className={`relative ${rounded} overflow-hidden border border-emerald-100 bg-black/5 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galerie foto clinică"
      tabIndex={0}
    >
      {/* Aspect wrapper */}
      <div className="relative aspect-[16/9]">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === safeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              // This sizes matches your layout: full width on mobile, half width on md+
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {showControls && len > 1 && (
        <>
          <button
            type="button"
            aria-label="Imaginea anterioară"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Imaginea următoare"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showIndicators && len > 1 && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Afișează imaginea ${i + 1}`}
              aria-current={i === safeIndex}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === safeIndex ? "bg-emerald-600" : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

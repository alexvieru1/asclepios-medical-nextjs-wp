"use client";

import dynamic from "next/dynamic";
import type { Testimonial } from "@/components/ui/animated-testimonials";

const AnimatedTestimonials = dynamic(
  () =>
    import("@/components/ui/animated-testimonials").then(
      (m) => m.AnimatedTestimonials
    ),
  { ssr: false }
);

export function MediciSliderClient({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) {
  return <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay} />;
}

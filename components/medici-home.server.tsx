import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDoctors } from "@/lib/clinic";
import { MediciSliderClient } from "./medici-slider.client";
import type { Testimonial } from "@/components/ui/animated-testimonials";

function toDesignation(specialities: string[]) {
  return specialities?.length ? specialities.slice(0, 2).join(" • ") : "Medic specialist";
}

export default async function MediciHomeServer() {
  const doctors = await getDoctors();

  const items: Testimonial[] = doctors.map((d) => {
    const specialities =
      d.specialities?.edges?.map((e) => e.node?.name).filter(Boolean) ?? [];
    return {
      name: d.title ?? "Medic",
      designation: toDesignation(specialities),
      quote: d.doctorFields?.shortDescription ?? "Consultații și îngrijire medicală.",
      src: d.featuredImage?.node?.mediaItemUrl ?? "/images/placeholder-doctor.jpg",
    };
  });

  const medics = items.slice(0, 5);

  return (
    <section id="medici" className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Medici</h2>
            <p className="mt-1 text-gray-600">
              Echipa noastră de specialiști, aproape de oameni.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/medici">Mai multe detalii</Link>
          </Button>
        </div>

        <div className="rounded-3xl border shadow-sm">
          <MediciSliderClient testimonials={medics} />
        </div>

        <div className="mt-6 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/medici">Mai multe detalii</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

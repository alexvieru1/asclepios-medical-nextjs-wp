"use client";

import * as React from "react";
import { toast } from "sonner";
import { Phone, MapPin, Route, Copy, ExternalLink } from "lucide-react";

type Props = {
  address: string;          // full street address
  phone: string;            // human-readable like "0241 611 445"
  cityLabel?: string;       // optional, e.g. "Constanța"
};

export default function ContactAssist({
  address,
  phone,
  cityLabel = "Asclepios Medical",
}: Props) {
  const telHref = "tel:+40241611145"; // 0241 611 445 (Romania)
  const mapsQuery = encodeURIComponent(`${address}, Romania`);
  const mapsEmbedSrc = `https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed&iwloc=near`;
  const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone.replace(/\s+/g, ""));
      toast.success("Numărul a fost copiat.");
    } catch {
      toast.error("Nu am putut copia numărul.");
    }
  };

  return (
    <section className="mx-auto my-12 max-w-5xl px-6">
      <div className="grid items-stretch gap-6 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur md:grid-cols-2 md:p-8">
        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-emerald-100">
          <iframe
            title={`Harta ${cityLabel}`}
            src={mapsEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full md:h-full"
          />
        </div>

        {/* Help / CTAs */}
        <div className="flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-emerald-900 text-xl font-bold md:text-2xl">
              Preferi telefonul?
            </h2>
            <p className="mt-2 text-emerald-900/70 leading-relaxed">
              Sună-ne și îți facem noi programarea. Este cea mai rapidă
              variantă pentru confirmare imediată.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-3 text-emerald-900">
              <Phone className="h-5 w-5 shrink-0" />
              <a
                href={telHref}
                className="text-lg font-semibold underline-offset-2 hover:underline"
                aria-label={`Sună la ${phone}`}
              >
                {phone}
              </a>
              <button
                type="button"
                onClick={copyPhone}
                className="ml-2 inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-1 text-sm text-emerald-900 hover:bg-emerald-100"
                aria-label="Copiază numărul"
                title="Copiază numărul"
              >
                <Copy className="h-4 w-4" />
                Copiază
              </button>
            </div>

            <div className="flex items-start gap-3 text-emerald-900">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <address className="not-italic">
                {address}
              </address>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-emerald-500/30 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              <Phone className="h-4 w-4" />
              Sună acum
            </a>

            <a
              href={mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-emerald-900 hover:bg-emerald-50"
            >
              <Route className="h-4 w-4" />
              Navighează către noi
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="text-sm text-emerald-800/70">
            Sfat: dacă nu vă descurcați cu formularul, sunați-ne. Echipa vă
            preia solicitarea și vă confirmă programarea.
          </p>
        </div>
      </div>
    </section>
  );
}

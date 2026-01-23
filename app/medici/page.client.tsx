"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type UiSpecialty = { slug: string; name: string };
type UiDoctor = {
  slug: string;
  title: string;
  img: string | null;
  specialties: { name: string; slug?: string | null }[];
  schedule: string | null;
};

function matchesSpecialty(doc: UiDoctor, sp: UiSpecialty): boolean {
  // Prefer slug match when available; fall back to case-insensitive name.
  if (doc.specialties.some((s) => s.slug && s.slug === sp.slug)) return true;
  const target = sp.name.trim().toLowerCase();
  return doc.specialties.some(
    (s) => (s.name || "").trim().toLowerCase() === target
  );
}

export default function MediciClient({
  specialties,
  doctors,
  initialSlug,
}: {
  specialties: UiSpecialty[];
  doctors: UiDoctor[];
  initialSlug: string | null;
}) {
  const fallbackSlug = specialties[0]?.slug ?? null;
  const normalizedInitial =
    specialties.length &&
    initialSlug &&
    specialties.some((s) => s.slug === initialSlug)
      ? initialSlug
      : fallbackSlug;

  if (!specialties.length) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <header className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Medici</h1>
            <p className="mt-1 text-gray-600">
              În acest moment nu există specialități disponibile.
            </p>
          </header>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Medici</h1>
          <p className="mt-1 text-gray-600">
            Echipa noastră de specialiști, grupată pe specialități.
          </p>
        </header>

        <Tabs
          key={normalizedInitial ?? "fallback"}
          defaultValue={normalizedInitial ?? undefined}
          className="w-full"
        >
          <TabsList className="h-auto w-full gap-2 flex flex-wrap justify-center lg:grid lg:justify-start lg:[grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]">
            {" "}
            {specialties.map((sp) => (
              <TabsTrigger
                key={sp.slug}
                value={sp.slug}
                className="w-full text-center"
              >
                {sp.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {specialties.map((sp) => {
            const items = doctors.filter((d) => matchesSpecialty(d, sp));
            return (
              <TabsContent key={sp.slug} value={sp.slug} className="mt-8">
                <DoctorsGrid items={items} activeSpecialtyLabel={sp.name} />
                {items.length === 0 && (
                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    Momentan nu există medici afișați pentru {sp.name}.
                  </p>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

function DoctorsGrid({
  items,
  activeSpecialtyLabel,
}: {
  items: UiDoctor[];
  activeSpecialtyLabel: string;
}) {
  const lgCols =
    items.length <= 1
      ? "lg:grid-cols-1"
      : items.length === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";

  return (
    <div className={cn("grid grid-cols-1 gap-6 justify-items-center", lgCols)}>
      {items.map((m) => {
        // Order badges: active first (by name), then others
        const ordered = [
          activeSpecialtyLabel,
          ...m.specialties
            .map((s) => s.name)
            .filter(
              (n) =>
                n.trim().toLowerCase() !==
                activeSpecialtyLabel.trim().toLowerCase()
            ),
        ].filter(Boolean);

        const visible = ordered.slice(0, 2);
        const extra = Math.max(ordered.length - visible.length, 0);

        return (
          <Card
            key={m.slug}
            className="w-full max-w-sm overflow-hidden text-center"
          >
            {/* Square photo */}
            <div className="relative aspect-square w-full bg-gray-50">
              {m.img ? (
                <Image
                  src={m.img}
                  alt={m.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                  {m.title}
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{m.title}</CardTitle>

              {/* Speciality badges (active first, then one more; rest collapsed) */}
              <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
                {visible.map((label) => (
                  <Badge
                    key={label}
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-800"
                    aria-label={`Specialitate: ${label}`}
                  >
                    {label}
                  </Badge>
                ))}
                {extra > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                    aria-label={`Încă ${extra} specialități`}
                    title={ordered.slice(2).join(", ")}
                  >
                    +{extra}
                  </Badge>
                )}
              </div>

              {/* Generic schedule (your WP model has a single schedule string) */}
              {m.schedule && (
                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Clock
                    className="h-4 w-4 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>{m.schedule}</span>
                </div>
              )}
            </CardHeader>

            <CardFooter className="pt-0 justify-center">
              {/* <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={`/medici/${m.slug}`}>Vezi detalii</Link>
              </Button> */}
              {/* //TODO IN CAZ DE AVEM PAGINA PER DR */}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

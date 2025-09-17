"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type SpecItem = {
  slug: string;
  title: string;
  desc?: string;
  img?: string | null;
};

export function SpecialitatiHome({ items }: { items: SpecItem[] }) {
  return (
    <section id="specialitati" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Specialități</h2>
            <p className="mt-1 text-gray-600">
              Servicii esențiale, explicate pe înțelesul tuturor.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/specialitati">Mai multe detalii</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {items.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <Link href={`/specialitati/${s.slug}`} aria-label={s.title}>
                  <div className="relative aspect-[4/3] w-full">
                    {s.img ? (
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-gray-50 text-gray-400">
                        Fără imagine
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                  </div>
                </Link>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                  {s.desc && (
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {s.desc}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="flex-1" />

                <CardFooter className="mt-auto pt-0">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href={`/specialitati/${s.slug}`}>Află mai multe</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/specialitati">Mai multe detalii</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

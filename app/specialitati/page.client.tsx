"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type UiSpecialty = {
  slug: string
  title: string
  description: string
  imageUrl: string | null
  imageAlt: string
}

export default function SpecialitatiClient({
  specialties,
}: {
  specialties: UiSpecialty[]
}) {
  return (
    <section className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Specialități</h1>
          <p className="mt-1 text-gray-600">
            Alege specialitatea și vezi medicii disponibili.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, index) => (
            <Card key={s.slug} className="overflow-hidden">
              <Link href={`/specialitati/${s.slug}`} aria-label={s.title}>
                <div className="relative aspect-[4/3] w-full bg-gray-50">
                  {s.imageUrl ? (
                    <Image
                      src={s.imageUrl}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                      Fără imagine
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>
              </Link>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{s.title}</CardTitle>
                {s.description && (
                  <CardDescription className="text-gray-600">
                    {s.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent />

              <CardFooter className="flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={`/medici?sp=${s.slug}`}>Vezi medici</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/contact?specialitate=${s.slug}`}>
                    Solicită programare
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

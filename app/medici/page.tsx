import { doctors as localDoctors } from "@/lib/doctors"
import { specialities as localSpecialities } from "@/lib/specialities"
import MediciClient from "./page.client"
import { Metadata } from "next"

export const revalidate = 3600

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
  title: "Medici | Asclepios",
  description:
    "Cunoașteți echipa Asclepios: medici dedicați în Obstetrică–Ginecologie, Medicină internă și Cardiologie. Programați o vizită online sau telefonic.",
  alternates: { canonical: "/medici" },
  openGraph: {
    title: "Medici | Asclepios",
    description:
      "Echipă cu experiență, aproape de pacienți. Vedeți profilurile și specializările.",
    url: "/medici",
    siteName: "Asclepios",
    type: "website",
    locale: "ro_RO",
  },
};

export default async function Page({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}

  // Simplified: use local constants
  const specialties = localSpecialities
  const doctors = localDoctors

  // Normalize what the client needs
  const simplifiedSpecialties = specialties.map((s) => ({
    slug: s.slug,
    name: s.title,
  }))

  const simplifiedDoctors = doctors

  const rawSpecialty = Array.isArray(params.sp) ? params.sp[0] : params.sp
  const requestedSpecialty = typeof rawSpecialty === "string" ? rawSpecialty : null
  const initialSlug = simplifiedSpecialties.some((s) => s.slug === requestedSpecialty)
    ? requestedSpecialty
    : simplifiedSpecialties[0]?.slug ?? null

  return (
    <MediciClient
      specialties={simplifiedSpecialties}
      doctors={simplifiedDoctors}
      initialSlug={initialSlug}
    />
  )
}

import { getDoctors, getSpecialties } from "@/lib/clinic"
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
  // Server-side fetching with your wp-graphql wrapper (tagged for revalidation)
  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(200), // raise if you want more cards by default
  ])

  // Normalize what the client needs (keeps the client component dead-simple)
  const simplifiedSpecialties = specialties.map((s) => ({
    slug: s.slug,
    name: s.name,
  }))

  const simplifiedDoctors = doctors.map((d) => {
    const img =
      d.featuredImage?.node?.mediaItemUrl ?? null

    // WPGraphQL inconsistency guard: sometimes it's `specialities`, sometimes `specialties`.
    // Your `DOCTORS_Q` uses "specialities" (edges->node->name).
    const doctorSpecs =
      d.specialities?.edges
        ?.map((e) => ({
          name: e?.node?.name ?? "",
          slug: e?.node?.slug ?? null,
        }))
        .filter((s) => s.name.trim().length > 0) ?? []

    return {
      slug: (d as any).slug as string, // ensure DOCTORS_Q selects `slug`
      title: d.title,
      img,
      specialties: doctorSpecs, // [{ name, (slug?) }]
      schedule: d.doctorFields?.schedule ?? null,
    }
  })

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

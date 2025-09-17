import { getDoctors, getSpecialties } from "@/lib/clinic"
import ContactClient from "./page.client"
import { Metadata } from "next"

export const revalidate = 1800

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
  title: "Contact | Asclepios",
  description:
    "Programări online sau telefonic la 0241.611.445. Adresă: Str. Prelungirea Bucovinei nr. 8B, Ap. 1, 900615 Constanța.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Asclepios",
    description:
      "Sunați la 0241.611.445 sau folosiți formularul de programare. Ne găsiți în Constanța, Str. Prelungirea Bucovinei nr. 8B, Ap. 1.",
    url: "/contact",
    siteName: "Asclepios",
    type: "website",
    locale: "ro_RO",
  },
};

export default async function Page({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}

  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(200),
  ])

  const specialtyOptions = specialties.map((s) => ({
    slug: s.slug,
    name: s.name,
  }))

  const doctorOptions = doctors
    .map((doctor) => {
      const slug = (doctor as any).slug as string | undefined
      if (!slug) return null

      const specialtiesForDoctor =
        doctor.specialities?.edges
          ?.map((edge) => edge?.node?.slug)
          .filter((value): value is string => Boolean(value)) ?? []

      return {
        slug,
        name: doctor.title ?? "Medic",
        specialties: specialtiesForDoctor,
      }
    })
    .filter((doc): doc is { slug: string; name: string; specialties: string[] } => Boolean(doc))

  const rawSpecialty = Array.isArray(params.specialitate)
    ? params.specialitate[0]
    : params.specialitate
  const defaultSpecialty =
    typeof rawSpecialty === "string" && specialtyOptions.some((s) => s.slug === rawSpecialty)
      ? rawSpecialty
      : ""

  return (
    <ContactClient
      specialties={specialtyOptions}
      doctors={doctorOptions}
      defaultSpecialty={defaultSpecialty}
    />
  )
}

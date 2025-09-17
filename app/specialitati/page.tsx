import { getSpecialties } from "@/lib/clinic"
import SpecialitatiClient from "./page.client"
import { Metadata } from "next";

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Specialități | Asclepios",
  description:
    "Servicii medicale în: Obstetrică–Ginecologie, Medicină internă și Cardiologie. Consultații, investigații și îngrijire continuă.",
  alternates: { canonical: "/specialitati" },
  openGraph: {
    title: "Specialități | Asclepios",
    description:
      "Obstetrică–Ginecologie • Medicină internă • Cardiologie — aflați ce oferim și cum vă putem ajuta.",
    url: "/specialitati",
    siteName: "Asclepios",
    type: "website",
    locale: "ro_RO",
  },
  keywords: [
    "obstetrică ginecologie Constanța",
    "medicină internă",
    "cardiologie",
    "servicii medicale",
  ],
};

export default async function Page() {
  const specialties = await getSpecialties()

  const simplified = specialties.map((s) => {
    const imageNode = s.specialityFields?.heroImage?.node ?? null
    return {
      slug: s.slug,
      title: s.name,
      description: s.specialityFields?.summary ?? "",
      imageUrl: imageNode?.mediaItemUrl ?? null,
      imageAlt: imageNode?.altText ?? s.name,
    }
  })

  return <SpecialitatiClient specialties={simplified} />
}

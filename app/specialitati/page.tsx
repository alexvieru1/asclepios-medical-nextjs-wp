import { specialities as localSpecialities } from "@/lib/specialities"
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
  const simplified = localSpecialities.map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description ?? "",
    imageUrl: s.imageUrl,
    imageAlt: s.imageAlt,
  }))

  return <SpecialitatiClient specialties={simplified} />
}

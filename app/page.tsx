import { AboutSection } from "@/components/despre-noi-home";
import { HeroSection } from "@/components/home-hero-section";
import MediciHomeServer from "@/components/medici-home.server";
import SpecialitatiHomeServer from "@/components/specialitati-home.server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Asclepios – Clinică medicală în Constanța",
    template: "%s | Asclepios",
  },
  description:
    "Clinică medicală în Constanța. Obstetrică–Ginecologie, Medicină internă, Cardiologie. Programări online sau la 0241.611.445.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Asclepios – Clinică medicală în Constanța",
    description:
      "Grijă autentică și medici dedicați. Programări online sau la 0241.611.445.",
    url: "/",
    siteName: "Asclepios",
    type: "website",
    locale: "ro_RO",
  },
  keywords: [
    "clinică Constanța",
    "obstetrică-ginecologie",
    "medicină internă",
    "cardiologie",
    "programări medicale",
  ],
};

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <HeroSection />
      <AboutSection/>
      <SpecialitatiHomeServer/>
      {/* <MediciHomeServer/> */}
    </div>
  );
}

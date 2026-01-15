import { specialities as localSpecialities } from "@/lib/specialities";
import { SpecialitatiHome, type SpecItem } from "./specialitati-home";

export default async function SpecialitatiHomeServer() {
  const specialties = localSpecialities;

  const items: SpecItem[] = specialties.map((sp) => ({
    slug: sp.slug,
    title: sp.title,
    desc: sp.description ?? "",
    img: sp.imageUrl,
  }));

  return <SpecialitatiHome items={items} />;
}

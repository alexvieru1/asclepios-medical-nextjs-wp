import { getSpecialties } from "@/lib/clinic";
import { SpecialitatiHome, type SpecItem } from "./specialitati-home";

export default async function SpecialitatiHomeServer() {
  const specialties = await getSpecialties();

  const items: SpecItem[] = specialties.map((sp) => ({
    slug: sp.slug,
    title: sp.name,
    desc: sp.specialityFields?.summary ?? "",
    img: sp.specialityFields?.heroImage?.node?.mediaItemUrl ?? null,
  }));

  return <SpecialitatiHome items={items} />;
}

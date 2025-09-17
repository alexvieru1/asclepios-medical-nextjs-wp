import { DOCTORS_Q, type DoctorCard } from "./queries/doctors";
import { DOCTOR_BY_SLUG_Q, DoctorFull } from "./queries/doctor-by-slug";
import { gqlFetch } from "./wp-graphql";

import { SPECIALITIES_Q, type SpecialtyNode } from "./queries/specialties";

export async function getSpecialties(): Promise<SpecialtyNode[]> {
  const data = await gqlFetch<{ specialities: { nodes: SpecialtyNode[] } }>(
    SPECIALITIES_Q
  );
  return data.specialities.nodes;
}

// lib/clinic.ts
export async function getDoctors(first = 12): Promise<DoctorCard[]> {
  const where = {
    // array of PostObjectsConnectionOrderbyInput
    orderby: [{ field: "DATE", order: "ASC" }], // oldest → newest
  };

  const data = await gqlFetch<{ doctors: { nodes: DoctorCard[] } }>(
    DOCTORS_Q,
    { first, where },
    { tags: ["doctors"] }
  );

  return data.doctors?.nodes ?? [];
}



export async function getDoctorBySlug(slug: string) {
  const data = await gqlFetch<{ doctor: DoctorFull | null }>(
    DOCTOR_BY_SLUG_Q,
    { slug },
    { tags: ["doctors", `doctor-${slug}`] }
  );
  return data.doctor;
}

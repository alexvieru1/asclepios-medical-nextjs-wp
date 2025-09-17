export const DOCTORS_Q = /* GraphQL */ `
  query Doctors($first: Int = 12, $where: RootQueryToDoctorConnectionWhereArgs) {
    doctors(first: $first, where: $where) {
      nodes {
        slug
        title
        featuredImage { node { mediaItemUrl } }
        specialities { edges { node { name slug } } }
        doctorFields { shortDescription schedule }
        date
      }
    }
  }
`;

export type DoctorCard = {
  title: string;
  slug: string;
  featuredImage?: { node?: { mediaItemUrl: string | null } | null } | null;
  specialities?: { edges: { node: { name: string; slug: string } }[] };
  doctorFields?: {
    shortDescription?: string | null;
    schedule?: string | null;
  } | null;
};

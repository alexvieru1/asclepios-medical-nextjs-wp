export const SPECIALITIES_Q = /* GraphQL */ `
  query Specialities($first: Int = 100) {
    specialities(first: $first) {
      nodes {
        slug
        name
        specialityFields {
          summary
          heroImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export type SpecialtyNode = {
  slug: string;
  name: string;
  specialityFields?: {
    summary?: string | null;
    heroImage?: {
      node?: {
        mediaItemUrl: string;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

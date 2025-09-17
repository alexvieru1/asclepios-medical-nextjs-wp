export const DOCTOR_BY_SLUG_Q = `
  query DoctorBySlug($slug: ID!) {
    doctor(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      featuredImage {
        node { altText sourceUrl mediaDetails { width height } }
      }
      doctorFields {
        schedule
        languages
        acceptingNewPatients
      }
      specialties { nodes { id slug name } }
    }
  }
`

export type DoctorFull = {
  id: string
  slug: string
  title: string
  content?: string | null
  featuredImage?: { node?: { altText?: string | null; sourceUrl: string } } | null
  doctorFields?: { schedule?: string | null; languages?: string[] | null; acceptingNewPatients?: boolean | null } | null
  specialties?: { nodes: { id: string; slug: string; name: string }[] }
}

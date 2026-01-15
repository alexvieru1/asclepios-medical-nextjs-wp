export interface Speciality {
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  imageAlt: string;
}

export const specialities: Speciality[] = [
  {
    slug: "cardiologie",
    title: "Cardiologie",
    description:
      "ECG, ecografie cardiacă și evaluarea riscului cardiovascular.",
    imageUrl:
      "https://complexvrajamarii.ro/wp-content/uploads/2026/01/cardiologie-scaled.jpg",
    imageAlt: "Cardiologie",
  },
  {
    slug: "medicina-interna",
    title: "Medicină Internă",
    description:
      "Evaluări complete, monitorizare și plan de tratament.",
    imageUrl:
      "https://complexvrajamarii.ro/wp-content/uploads/2026/01/medicina-interna-scaled.jpg",
    imageAlt: "Medicină Internă",
  },
  {
    slug: "obstetrica-ginecologie",
    title: "Obstetrică–Ginecologie",
    description:
      "Consultații, ecografii, screening și consiliere personalizată.",
    imageUrl:
      "https://complexvrajamarii.ro/wp-content/uploads/2026/01/obstetrica-ginecologie-scaled.jpg",
    imageAlt: "Obstetrică–Ginecologie",
  },
];
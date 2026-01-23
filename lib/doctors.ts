export interface Doctor {
  slug: string;
  title: string;
  img: string | null;
  specialties: { name: string; slug?: string | null }[];
  schedule: string | null;
  quote?: string | null;
}

export const doctors: Doctor[] = [
  {
    slug: "dr-dan-raica",
    title: "Dr. Dan Raica",
    img: "https://complexvrajamarii.ro/wp-content/uploads/2026/01/dr-dan-raica.jpg",
    specialties: [
      { name: "Obstetrică–Ginecologie", slug: "obstetrica-ginecologie" },
    ],
    schedule: "Luni - Joi: 14:00 - 17:00",
    quote: "Consultații și îngrijire medicală.",
  },
  {
    slug: "dr-adriana-raica",
    title: "Dr. Adriana Raica",
    img: "https://complexvrajamarii.ro/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-23-at-13.02.46.jpeg",
    specialties: [
      { name: "Cardiologie", slug: "cardiologie" },
      { name: "Medicină Internă", slug: "medicina-interna" },
    ],
    schedule: "Luni - Vineri: 09:00 - 17:00",
    quote: "Consultații și îngrijire medicală.",
  },
  {
    slug: "dr-anca-cretu",
    title: "Dr. Anca Crețu",
    img: "https://complexvrajamarii.ro/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-23-at-12.23.28.jpeg",
    specialties: [{ name: "Cardiologie", slug: "cardiologie" }],
    schedule: "Luni - Vineri: 09:00 - 17:00",
    quote: "Consultații și îngrijire medicală.",
  },
  {
    slug: "dr-oana-laura-coiciu",
    title: "Dr. Oana Laura Coiciu",
    img: null,
    specialties: [
      { name: "Cardiologie", slug: "cardiologie" },
      { name: "Medicină Internă", slug: "medicina-interna" },
    ],
    schedule: "Marți - Joi: 14:00 - 17:00",
    quote: "Consultații și îngrijire medicală.",
  },
  {
    slug: "dr-cirimpei-lidia",
    title: "Dr. Lidia Cirimpei",
    img: null,
    specialties: [
      { name: "Cardiologie", slug: "cardiologie" },
    ],
    schedule: "Luni - Joi: 14:00 - 17:00",
    quote: "Consultații și îngrijire medicală.",
  },
];

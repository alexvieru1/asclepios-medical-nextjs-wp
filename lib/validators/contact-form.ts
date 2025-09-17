import { z } from "zod"

const optionalText = z.string().trim().optional().default("")
const phoneText = z.string().trim().max(32, "Numarul de telefon este prea lung.").optional().default("")

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele complet este necesar.")
    .max(120, "Numele este prea lung."),
  email: z
    .string()
    .trim()
    .email("Introduceți o adresa de email valida."),
  phone: phoneText,
  specialty: optionalText,
  doctor: optionalText,
  preferredDate: optionalText,
  message: z
    .string()
    .trim()
    .min(10, "Mesajul este prea scurt."),
  website: optionalText,
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Va rugam sa acceptati prelucrarea datelor personale.",
    }),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

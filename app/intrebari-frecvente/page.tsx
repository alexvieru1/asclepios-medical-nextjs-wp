// app/intrebari-frecvente/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Întrebări frecvente | Asclepios",
  description:
    "Răspunsuri scurte la întrebările frecvente pentru Obstetrică–Ginecologie, Cardiologie și Medicină internă.",
}

type FaqItem = { q: string; a: string }
type FaqSection = { id: string; title: string; items: FaqItem[] }

// --- Content (edit freely)
const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "obstetrica-ginecologie",
    title: "Obstetrică–Ginecologie",
    items: [
      {
        q: "Cum mă programez pentru ecografie de sarcină?",
        a: "Puteți folosi formularul nostru de pe pagina Contact sau ne sunați la 0241.611.445. Spuneți vârsta sarcinii (dacă o știți) și aduceți documentele medicale pe care le aveți.",
      },
      {
        q: "Ce aduc la consultația de ginecologie?",
        a: "Actul de identitate, bilet de trimitere (dacă aveți), lista de medicamente, analizele și investigațiile anterioare. Pentru testul Babeș-Papanicolau evitați contactul sexual și ovulele cu 48h înainte.",
      },
      {
        q: "Este nevoie de pregătire pentru testul Papanicolau?",
        a: "Ideal, recoltarea se face în afara menstruației. Evitați spălăturile intravaginale și ovulele cu 48h înainte. Nu este necesar să veniți nemâncată.",
      },
      {
        q: "Când ar trebui să consult un medic dacă am sângerări neregulate?",
        a: "Programați o vizită dacă sângerările sunt abundente, apar între menstruații, după contact sau după instalarea menopauzei. Medicul va decide ce investigații sunt potrivite.",
      },
    ],
  },
  {
    id: "cardiologie",
    title: "Cardiologie",
    items: [
      {
        q: "Am nevoie de programare pentru EKG sau ecocardiografie?",
        a: "Da. Programați-vă telefonic la 0241.611.445 sau prin formularul online. Pentru ecocardiografie aduceți rezultatele anterioare, dacă există.",
      },
      {
        q: "Cum mă pregătesc pentru monitorizarea Holter TA sau EKG?",
        a: "Nu este necesară pregătire specială. Purtați haine lejere, mențineți pielea uscată și evitați cremele grase în ziua montării.",
      },
      {
        q: "Ce simptome impun un consult rapid?",
        a: "Durere în piept, dispnee, palpitații persistente, edeme ale gleznelor sau creșteri mari ale tensiunii. Dacă simptomele sunt severe, apelați 112.",
      },
      {
        q: "Tratamentul meu antihipertensiv trebuie oprit înainte de consult?",
        a: "Nu opriți medicația fără recomandarea medicului. Ideal, aduceți notițe cu valorile tensiunii din ultimele zile.",
      },
    ],
  },
  {
    id: "medicina-interna",
    title: "Medicină internă",
    items: [
      {
        q: "Pentru un consult general, ce documente să aduc?",
        a: "Actul de identitate, biletul de trimitere (dacă aveți), scrisori medicale, liste de medicamente și analize recente.",
      },
      {
        q: "Trebuie să fiu a jeun pentru analizele de sânge?",
        a: "Pentru profil lipidic și glicemie e recomandat repaus alimentar 8–12 ore (apă plată permisă). Urmați indicațiile primite la programare.",
      },
      {
        q: "Pot obține recomandări pentru investigații suplimentare?",
        a: "Da, medicul internist stabilește, la nevoie, investigații și direcționări către alte specialități (cardiologie, imagistică ș.a.).",
      },
      {
        q: "Cum primesc rezultatele și planul de tratament?",
        a: "La finalul consultației primiți explicații și recomandări scrise. Pentru clarificări ulterioare ne puteți contacta telefonic.",
      },
    ],
  },
]

// Build FAQPage JSON-LD
function buildFaqJsonLd(sections: FaqSection[]) {
  const mainEntity = sections.flatMap((s) =>
    s.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    }))
  )
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  }
}

export default function FaqPage() {
  const jsonLd = buildFaqJsonLd(FAQ_SECTIONS)

  return (
    <main className="bg-gradient-to-t from-emerald-50 via-white to-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <h1 className="text-emerald-900 text-3xl font-bold md:text-4xl">Întrebări frecvente</h1>
        <p className="mt-3 text-emerald-900/70 max-w-3xl">
          Am strâns răspunsuri la cele mai comune întrebări pentru specialitățile noastre. Dacă nu
          găsiți ce aveți nevoie, ne puteți{" "}
          <Link href="/contact" className="text-emerald-700 underline hover:no-underline">
            scrie aici
          </Link>{" "}
          sau suna la <a href="tel:0241611445" className="text-emerald-700">0241.611.445</a>.
        </p>
      </section>

      {/* Quick jump links */}
      <nav className="mx-auto max-w-5xl px-6 pb-4">
        <ul className="flex flex-wrap gap-2">
          {FAQ_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "rounded-full border border-emerald-200 px-3 py-1 text-sm",
                  "text-emerald-900/90 hover:bg-emerald-50"
                )}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      <div className="mx-auto max-w-5xl px-6 pb-14">
        {FAQ_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-[150px] mb-10 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur md:p-8"
          >
            <h2 className="text-emerald-900 text-xl font-semibold md:text-2xl">{section.title}</h2>
            <Accordion type="multiple" className="mt-4">
              {section.items.map((item, i) => (
                <AccordionItem key={`${section.id}-${i}`} value={`${section.id}-${i}`}>
                  <AccordionTrigger className="text-left text-emerald-900">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-emerald-900/80 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}

        {/* Contact CTA */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-900">
          <p className="font-medium">Încă aveți întrebări?</p>
          <p className="mt-1">
            Ne puteți suna la{" "}
            <a className="underline" href="tel:0241611445">
              0241.611.445
            </a>{" "}
            sau folosi{" "}
            <Link className="underline" href="/contact">
              formularul de programare
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

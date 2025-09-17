// app/informatii-utile/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Informații utile | Asclepios",
  description:
    "Sfaturi practice pentru vizita la medic: ce întrebări pune medicul, ce să aduci, ce informații contează și cum te pregătești.",
}

const PHONE = "0241.611.445"
const ADDRESS =
  "Str. Prelungirea Bucovinei nr. 8B, Apartament 1, 900615 Constanța"

export default function InformatiiUtilePage() {
  return (
    <main className="bg-gradient-to-t from-emerald-50 via-white to-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <h1 className="text-emerald-900 text-3xl font-bold md:text-4xl">
          Informații utile
        </h1>
        <p className="mt-3 text-emerald-900/70 max-w-3xl">
          Mai jos găsiți un ghid scurt care vă ajută să vă pregătiți pentru
          consultație. Scopul este ca întâlnirea cu medicul să fie clară,
          eficientă și cât mai liniștitoare.
        </p>
      </section>

      {/* Tips strip */}
      <section className="mx-auto max-w-5xl px-6 pb-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-900">
          <p className="font-medium">Ai nevoie de ajutor rapid?</p>
          <p className="mt-1">
            Ne poți suna la{" "}
            <a className="underline" href={`tel:${PHONE.replace(/\./g, "")}`}>
              {PHONE}
            </a>{" "}
            sau ne poți scrie din pagina{" "}
            <Link className="underline" href="/contact">
              Contact
            </Link>
            . Ne găsești la {ADDRESS}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur md:p-8">
          <h2 className="text-emerald-900 text-xl font-semibold md:text-2xl">
            Ghid pentru consultație
          </h2>

          <Accordion type="multiple" className="mt-4">
            {/* 1 */}
            <AccordionItem value="q-1">
              <AccordionTrigger className="text-left text-emerald-900">
                Ce întrebări pune medicul?
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  <li>De ce ai venit acum la doctor? (simptome, de când au apărut)</li>
                  <li>Ce boli ai mai avut? Ce intervenții chirurgicale?</li>
                  <li>Ce medicamente iei în prezent?</li>
                  <li>Ai făcut recent analize sau investigații? Ce rezultate au avut?</li>
                  <li>(Pentru sănătatea reproductivă) Cum este ciclul menstrual?</li>
                  <li>Au existat sarcini pierdute sau întreruperi de sarcină? Când?</li>
                  <li>Ai folosit metode de contracepție? Care?</li>
                  <li>Ai avut boli cu transmitere sexuală? Care și când?</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 2 */}
            <AccordionItem value="q-2">
              <AccordionTrigger className="text-left text-emerald-900">
                Ce trebuie să știe medicul despre tine?
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <p>
                  Informațiile pe care le oferi îl ajută să înțeleagă corect
                  starea ta de sănătate și să decidă ce pași urmează (investigații,
                  tratament, recomandări). Fii cât mai specific(ă) și adu documentele
                  relevante.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 3 */}
            <AccordionItem value="q-3">
              <AccordionTrigger className="text-left text-emerald-900">
                Fii pregătit(ă) să răspunzi la întrebări despre:
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Istoricul medical personal</strong> (boli, operații, alergii).
                  </li>
                  <li>
                    <strong>Istoricul medical al familiei</strong> (părinți, frați/surori,
                    bunici) – boli importante trecute sau prezente.
                  </li>
                  <li>
                    <strong>Motivul vizitei</strong> – ce te-a adus acum la medic.
                  </li>
                  <li>
                    <strong>Medicamente</strong> actuale sau recente (inclusiv cele fără
                    rețetă, suplimente, ceaiuri). Notează dacă vreun medicament ți-a făcut rău.
                  </li>
                  <li>
                    <strong>Alergii</strong> la alimente sau medicamente.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 4 */}
            <AccordionItem value="q-4">
              <AccordionTrigger className="text-left text-emerald-900">
                De ce este important istoricul medical?
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <p>
                  Istoricul oferă „piesa lipsă” pentru a înțelege simptomele actuale,
                  riscurile personale și opțiunile cele mai potrivite de investigație
                  sau tratament. Cu cât informațiile sunt mai complete, cu atât decizia
                  medicală este mai bună.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* 5 */}
            <AccordionItem value="q-5">
              <AccordionTrigger className="text-left text-emerald-900">
                La ce să te aștepți să fii întrebat(ă)
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Probleme de sănătate trecute sau prezente (bolile copilăriei,
                    intervenții, boli cronice: diabet, hipertensiune, afecțiuni hepatice).
                  </li>
                  <li>
                    Alte consulturi / internări și motivul lor.
                  </li>
                  <li>
                    Analize recente (EKG, radiografii, analize de sânge) – e util să aduci
                    rezultatele.
                  </li>
                  <li>
                    Stil de viață: activitate fizică, fumat, alcool, regim alimentar.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 6 */}
            <AccordionItem value="q-6">
              <AccordionTrigger className="text-left text-emerald-900">
                Întrebări despre sănătatea reproductivă (dacă este cazul)
              </AccordionTrigger>
              <AccordionContent className="text-emerald-900/80 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ciclul menstrual (ritmicitate, durată, cantitate).</li>
                  <li>Numărul sarcinilor și al nașterilor.</li>
                  <li>
                    Pierderi de sarcină (spontane) sau întreruperi de sarcină (când,
                    de câte ori).
                  </li>
                  <li>
                    Metode de contracepție folosite (pilule, sterilet, metode naturale).
                  </li>
                  <li>
                    Antecedente de boli cu transmitere sexuală.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Helpful reminders */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoCard title="Ce să ai la tine">
              <ul className="list-disc pl-5 space-y-1">
                <li>Act de identitate și, dacă există, bilet de trimitere.</li>
                <li>Lista medicamentelor pe care le iei (doze și ore).</li>
                <li>Rezultatele analizelor/investigațiilor recente.</li>
                <li>Cardul de sănătate (dacă este necesar).</li>
              </ul>
            </InfoCard>
            <InfoCard title="Cum te programezi">
              <p>
                Ne suni la{" "}
                <a className="underline" href={`tel:${PHONE.replace(/\./g, "")}`}>
                  {PHONE}
                </a>{" "}
                sau folosești{" "}
                <Link className="underline" href="/contact">
                  formularul de programare
                </Link>
                . Dacă nu ești sigur(ă) ce specialitate alegi, spune pe scurt
                problema și te ghidăm noi.
              </p>
            </InfoCard>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-md shadow-emerald-100/30",
        className
      )}
    >
      <h3 className="text-emerald-900 font-semibold">{title}</h3>
      <div className="mt-2 text-emerald-900/80 leading-relaxed">{children}</div>
    </div>
  )
}

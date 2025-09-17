import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "GDPR – Notificare privind prelucrarea datelor | Asclepios",
  description:
    "Află cum prelucrăm datele cu caracter personal la ASCLEPIOS MEDICALHEALTH SRL: scopuri, temeiuri, destinatari, perioade de stocare și drepturile tale GDPR.",
}

const OPERATOR = {
  name: "ASCLEPIOS MEDICALHEALTH SRL",
  reg: "J13/2463/2015",
  cui: "35236846",
  address: "Constanța, Str. Prelungirea Bucovinei, nr. 8B, bl. C1, ap. 1",
  phone: "0241.611.544",
  email: "office@asclepios-medical.ro",
  representative: "Dl. Raica Dan Mugurel – Administrator",
}

export default function GDPRPage() {
  return (
    <main className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <h1 className="text-emerald-900 text-3xl font-bold md:text-4xl">
          Notificare privind prelucrarea datelor cu caracter personal (GDPR)
        </h1>
        <p className="mt-3 text-emerald-900/70 max-w-3xl">
          Prezenta informare explică modul în care prelucrăm datele dvs. cu caracter personal în
          conformitate cu Regulamentul (UE) 679/2016 (GDPR) și Legea 190/2018.
        </p>
      </section>

      {/* Operator card */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur">
          <h2 className="text-emerald-900 text-xl font-semibold">Operatorul de date</h2>
          <div className="mt-3 grid gap-3 text-emerald-900/80 md:grid-cols-2">
            <div>
              <p className="font-medium">{OPERATOR.name}</p>
              <p>Nr. Reg. Com.: {OPERATOR.reg}</p>
              <p>CUI: {OPERATOR.cui}</p>
              <p>{OPERATOR.representative}</p>
            </div>
            <div>
              <p>{OPERATOR.address}</p>
              <p>
                Tel:{" "}
                <a href="tel:+40241611544" className="text-emerald-700 underline decoration-emerald-300">
                  {OPERATOR.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:office@asclepios-medical.ro"
                  className="text-emerald-700 underline decoration-emerald-300"
                >
                  {OPERATOR.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 pb-16 space-y-10">
        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Categorii de date prelucrate</h3>
          <ul className="mt-3 list-disc pl-6 text-emerald-900/80 space-y-2">
            <li>
              <span className="font-medium">Date de identificare</span> (nume, prenume, adresă, vârstă, data
              nașterii, sex, telefon, e-mail, CNP, semnătură).
            </li>
            <li>
              <span className="font-medium">Statut persoană</span> (pensionar, salariat etc.) pentru calitatea de
              asigurat și chestionare interne de satisfacție.
            </li>
            <li>
              <span className="font-medium">Date privind sănătatea</span> (FOCG, antecedente personale și
              heredocolaterale, rezultate investigații) – necesare actului medical.
            </li>
            <li>
              <span className="font-medium">Date financiare</span> (cont bancar, categorie venituri) – relații
              contractuale și financiare.
            </li>
            <li>
              <span className="font-medium">Imagini / înregistrări audio-video și informații despre locație</span>,
              pentru pază și protecție, îmbunătățirea serviciilor și soluționarea solicitărilor.
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Scopuri și temeiuri</h3>
          <div className="mt-3 grid gap-6 md:grid-cols-2 text-emerald-900/80">
            <div>
              <p className="font-medium">Scopuri</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Prestarea serviciilor medicale</li>
                <li>Raportări către CJAS / MS / ANMCS</li>
                <li>Raportări interne și analize statistice/actuariale</li>
                <li>Marketing și comunicări (cu consimțământ)</li>
                <li>Securitate (supraveghere audio-video)</li>
                <li>Înregistrare contabilă, recuperare creanțe</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Temeiuri</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Executarea contractului de prestări servicii</li>
                <li>Obligații legale ale Operatorului</li>
                <li>Consimțământul dvs., acolo unde este necesar</li>
                <li>Interesul legitim (ex. statistici, raportări interne)</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Destinatari & transferuri</h3>
          <p className="mt-3 text-emerald-900/80">
            Putem divulga date către autorități ale statului (fiscale, sănătate, protecția consumatorilor, organe
            competente în materie penală) în baza obligațiilor legale. Pentru eventuale transferuri în afara SEE,
            asigurăm garanții adecvate (inclusiv clauze contractuale standard).
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Durata de stocare</h3>
          <p className="mt-3 text-emerald-900/80">
            Datele sunt prelucrate cel puțin pe durata contractului de prestări servicii și ulterior conform
            termenelor legale de păstrare aplicabile fiecărei categorii de informații.
          </p>
        </article>

        {/* Rights as accordion for readability */}
        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Drepturile dvs. GDPR</h3>
          <Accordion type="single" collapsible className="mt-3">
            {RIGHTS.map((r) => (
              <AccordionItem key={r.id} value={r.id}>
                <AccordionTrigger className="text-left">{r.title}</AccordionTrigger>
                <AccordionContent className="text-emerald-900/80">{r.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h3 className="text-emerald-900 text-lg font-semibold">Cum ne contactați</h3>
          <ul className="mt-3 list-disc pl-6 text-emerald-900/80 space-y-2">
            <li>
              E-mail:{" "}
              <a href="mailto:office@asclepios-medical.ro" className="text-emerald-700 underline">
                office@asclepios-medical.ro
              </a>
            </li>
            <li>Personal: la sediul firmei</li>
            <li>
              Poștă: {OPERATOR.address}
            </li>
            <li>
              Telefon:{" "}
              <a href="tel:+40241611544" className="text-emerald-700 underline">
                0241/611.544
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-emerald-900/60">
            Notificarea este revizuită periodic. Consultați această pagină pentru actualizări.
          </p>
        </article>
      </section>
    </main>
  )
}

const RIGHTS = [
  {
    id: "access",
    title: "Dreptul de acces",
    body:
      "Puteți obține confirmarea dacă vă prelucrăm datele și informații privind categoriile de date, scopuri, destinatari, perioade de stocare și sursa datelor (dacă nu au fost colectate direct de la dvs.).",
  },
  {
    id: "rect",
    title: "Dreptul la rectificare",
    body: "Puteți solicita corectarea/actualizarea datelor inexacte sau completarea celor incomplete.",
  },
  {
    id: "erase",
    title: "Dreptul la ștergere („de a fi uitat”)",
    body:
      "Puteți solicita ștergerea datelor în anumite situații (de ex., datele nu mai sunt necesare, v-au fost prelucrate ilegal sau vă retrageți consimțământul acolo unde a fost temei).",
  },
  {
    id: "withdraw",
    title: "Dreptul de a vă retrage consimțământul",
    body:
      "Vă puteți retrage consimțământul în orice moment pentru prelucrările bazate pe consimțământ, fără a afecta legalitatea prelucrării anterioare.",
  },
  {
    id: "restrict",
    title: "Dreptul la restricționarea prelucrării",
    body:
      "Puteți solicita restricționarea prelucrării, de exemplu când contestați exactitatea datelor sau când prelucrarea este ilegală și vă opuneți ștergerii.",
  },
  {
    id: "port",
    title: "Dreptul la portabilitatea datelor",
    body:
      "Puteți primi datele furnizate într-un format structurat, utilizat în mod curent și care poate fi citit automat, și le puteți transmite altui operator, în condițiile legii.",
  },
  {
    id: "object",
    title: "Dreptul la opoziție",
    body:
      "Vă puteți opune prelucrării bazate pe interes legitim sau în scop de marketing direct (inclusiv profilare).",
  },
  {
    id: "automated",
    title: "Decizii automate și profilare",
    body:
      "Aveți dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrare automată care produce efecte juridice sau vă afectează în mod similar semnificativ.",
  },
  {
    id: "complaint",
    title: "Plângere și acces la justiție",
    body:
      "Puteți depune o plângere la noi sau la autoritatea de supraveghere competentă și vă puteți adresa instanțelor de judecată.",
  },
]

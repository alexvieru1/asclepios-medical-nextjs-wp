import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politica de Cookies | Asclepios",
  description:
    "Află ce sunt cookie-urile, ce tipuri folosim pe acest site, în ce scop și cum îți poți gestiona preferințele.",
}

export default function CookiesPage() {
  return (
    <main className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <h1 className="text-emerald-900 text-3xl font-bold md:text-4xl">Politica de utilizare a cookie-urilor</h1>
        <p className="mt-3 text-emerald-900/70 max-w-3xl">
          Folosim cookie-uri pentru a opera site-ul, a îmbunătăți experiența, a analiza traficul și, atunci când este
          cazul, pentru comunicări de marketing. Unele cookie-uri sunt setate de terți.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 space-y-10">
        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h2 className="text-emerald-900 text-xl font-semibold">Ce este un cookie?</h2>
          <p className="mt-3 text-emerald-900/80">
            Un cookie este un fișier text de mici dimensiuni salvat în browserul dispozitivului dvs. Cookie-urile pot
            fi de sesiune (se șterg la închiderea browserului) sau persistente (rămân până la expirare/ștergere). Ele
            nu rulează cod și nu pot accesa fișierele de pe dispozitiv.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h2 className="text-emerald-900 text-xl font-semibold">Ce cookie-uri folosim</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-emerald-900 font-medium">Cookie-uri strict necesare</h3>
              <p className="mt-2 text-emerald-900/80">
                Necesare pentru funcționarea site-ului (de ex. menținerea sesiunii, preferințe de siguranță).
                Puteți bloca aceste cookie-uri în browser, însă anumite funcții nu vor mai fi disponibile.
              </p>
            </div>
            <div>
              <h3 className="text-emerald-900 font-medium">Cookie-uri de performanță și analiză</h3>
              <p className="mt-2 text-emerald-900/80">
                Ne ajută să înțelegem cum este utilizat site-ul (pagini vizitate, durată etc.) pentru a-l îmbunătăți.
                Exemple: Google Analytics sau servicii similare.
              </p>
            </div>
            <div>
              <h3 className="text-emerald-900 font-medium">Cookie-uri de funcționalitate</h3>
              <p className="mt-2 text-emerald-900/80">
                Rețin opțiuni precum limbă, preferințe de afișare, astfel încât experiența să fie personalizată.
              </p>
            </div>
            <div>
              <h3 className="text-emerald-900 font-medium">Cookie-uri de publicitate / social media</h3>
              <p className="mt-2 text-emerald-900/80">
                Pot fi setate de parteneri pentru a livra conținut/mesaje relevante sau pentru a permite funcții de
                distribuire pe rețele sociale. Acestea aparțin terților și au propriile politici.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-emerald-900/60">
            Domeniul vizat: <span className="font-mono">asclepios-medical.ro</span>
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h2 className="text-emerald-900 text-xl font-semibold">Cookie-uri terțe și analitice</h2>
          <p className="mt-3 text-emerald-900/80">
            Putem folosi servicii terțe (ex. Google Analytics) pentru a colecta informații agregate despre vizitare.
            Aceste servicii pot seta propriile cookie-uri. Pentru mai multe detalii, consultați politicile lor:
          </p>
          <ul className="mt-2 list-disc pl-6 text-emerald-900/80 space-y-1">
            <li>
              <a
                href="https://policies.google.com/privacy?hl=ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                Politica de confidențialitate Google
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/about/privacy/update"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                Politica de confidențialitate Facebook
              </a>
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h2 className="text-emerald-900 text-xl font-semibold">Cum puteți controla cookie-urile</h2>
          <ul className="mt-3 list-disc pl-6 text-emerald-900/80 space-y-2">
            <li>
              Puteți configura browserul pentru a bloca/șterge cookie-uri sau pentru a vă anunța când un site încearcă
              să le seteze. Consultați secțiunea „Ajutor” a browserului.
            </li>
            <li>
              Pentru cookie-urile analitice/marketing, vom afișa un banner de consimțământ (în curând), unde puteți
              accepta sau respinge categoriile opționale.
            </li>
            <li>
              Rețineți: dezactivarea cookie-urilor strict necesare poate afecta funcționarea corectă a site-ului.
            </li>
          </ul>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-md shadow-emerald-100/30">
          <h2 className="text-emerald-900 text-xl font-semibold">Securitate & confidențialitate</h2>
          <p className="mt-3 text-emerald-900/80">
            Cookie-urile nu conțin programe și nu pot rula cod. Totuși, recomandăm utilizarea rețelelor securizate,
            actualizarea periodică a browserului și a soluțiilor anti-malware. Pentru detalii despre prelucrarea
            datelor cu caracter personal, consultați și{" "}
            <Link href="/gdpr" className="text-emerald-700 underline">
              pagina GDPR
            </Link>
            .
          </p>
        </article>

        <p className="text-sm text-emerald-900/60">
          Această politică poate fi actualizată. Verificați periodic pentru modificări.
        </p>
      </section>
    </main>
  )
}

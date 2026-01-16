import type { Metadata } from "next";
import HeroFadeCarousel from "@/components/hero-fade-in";
import { ExternalCard } from "@/components/ui/external-card";


const CLINIC_PHOTOS = [
  {
    src: "https://complexvrajamarii.ro/wp-content/uploads/2026/01/FormatFactoryDSCF2931.jpg",
    alt: "Clinica Asclepios",
  },
  {
    src: "https://complexvrajamarii.ro/wp-content/uploads/2026/01/FormatFactoryDSCF2831.jpg",
    alt: "Recepția clinicii Asclepios",
  },
];

const EUROMATERNA_IMG =
  "https://complexvrajamarii.ro/wp-content/uploads/2026/01/logo-euromaterna.png";
const VRAJA_MARII_IMG =
  "https://complexvrajamarii.ro/wp-content/uploads/2026/01/logo-vm.png";
const DR_RAICA_IMG =
  "https://complexvrajamarii.ro/wp-content/uploads/2026/01/dr-dan-raica-blog.jpg";

const LINKS = {
  euromaterna: "https://www.euromaterna.ro/",
  vrajaMarii: "https://complexvrajamarii.ro/",
  drRaica: "https://dan.raica.ro/",
};

export const metadata: Metadata = {
  title: "Despre noi | Asclepios",
  description:
    "Cunoașteți pe scurt povestea și valorile noastre: grijă autentică, medici dedicați și o relație apropiată cu pacienții.",
};

export default function DespreNoiPage() {
  return (
    <main className="bg-gradient-to-t from-emerald-50 via-white to-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <h1 className="text-emerald-900 text-3xl font-bold md:text-4xl">
          Despre noi
        </h1>
        <p className="mt-3 text-emerald-900/70 max-w-3xl">
          La Asclepios, credem într-o medicină apropiată de oameni. Combinăm
          experiența echipei cu un mod de lucru cald și răbdător, astfel încât
          fiecare vizită să fie cât mai clară și lipsită de griji.
        </p>
      </section>

      {/* About block with image */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="grid gap-6 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur md:grid-cols-2 md:p-8">
          <div className="order-2 md:order-1">
            <h2 className="text-emerald-900 text-xl font-semibold md:text-2xl">
              Cine suntem
            </h2>
            <p className="mt-3 leading-relaxed text-emerald-900/80">
              Suntem o clinică medicală din Constanța, orientată spre prevenție,
              diagnostic corect și urmărire atentă. Ne dorim să explicăm pe
              înțeles, să oferim timp fiecărui pacient și să păstrăm legătura
              atunci când este nevoie.
            </p>
            <ul className="mt-5 space-y-2 text-emerald-900/80">
              <li>• Programări flexibile și comunicare clară</li>
              <li>• Colaborări cu centre de încredere pentru investigații</li>
              <li>• Respect, discreție și sprijin pentru fiecare familie</li>
            </ul>

            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-emerald-500/30 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              >
                Programează o vizită
              </a>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-2xl border border-emerald-100 md:order-2">
            {/* Use <img> to avoid next/image remote config. Replace HERO_IMAGE. */}
            <HeroFadeCarousel
              images={CLINIC_PHOTOS}
              intervalMs={5000}
              className="md:h-full" // keeps the previous look
              rounded="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Values / quick facts */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <Fact title="Empatie">
            Relație apropiată, explicații pe înțelesul tuturor.
          </Fact>
          <Fact title="Grijă pentru familie">
            Ne adaptăm nevoilor vârstei și contextului.
          </Fact>
          <Fact title="Colaborări de încredere">
            Trimitem rapid către investigații când e necesar.
          </Fact>
        </div>
      </section>

      {/* See also */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-emerald-900 text-xl font-semibold md:text-2xl">
          Vezi și
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ExternalCard
            title="Euromaterna"
            href={LINKS.euromaterna}
            imgSrc={EUROMATERNA_IMG}
            alt="Euromaterna"
            fit="contain"
          />
          <ExternalCard
            title="Complex Vraja Mării"
            href={LINKS.vrajaMarii}
            imgSrc={VRAJA_MARII_IMG}
            alt="Complex Vraja Mării"
            fit="contain"
          />
          <ExternalCard
            title="Dr. Dan Raica – Blog"
            href={LINKS.drRaica}
            imgSrc={DR_RAICA_IMG}
            alt="Blogul Dr. Dan Raica"
            fit="cover"
          />
        </div>
      </section>
    </main>
  );
}

function Fact({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-md shadow-emerald-100/30">
      <h3 className="text-emerald-900 font-semibold">{title}</h3>
      <p className="mt-1 text-emerald-900/80">{children}</p>
    </div>
  );
}
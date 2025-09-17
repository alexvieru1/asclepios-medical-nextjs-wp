"use client";

import Link from "next/link";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconPrinter,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-emerald-700">Asclepios</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Medical Center
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Servicii medicale cu accent pe acuratețe, empatie și siguranța pacientului.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Link href="#" aria-label="Facebook" className="rounded-full border p-2 hover:bg-emerald-50">
                <IconBrandFacebook className="h-5 w-5 text-emerald-700" />
              </Link>
              <Link href="#" aria-label="Instagram" className="rounded-full border p-2 hover:bg-emerald-50">
                <IconBrandInstagram className="h-5 w-5 text-emerald-700" />
              </Link>
              <Link href="https://wa.me/40XXXXXXXXX" aria-label="WhatsApp" className="rounded-full border p-2 hover:bg-emerald-50">
                <IconBrandWhatsapp className="h-5 w-5 text-emerald-700" />
              </Link>
            </div>
          </div>

          {/* Navigație */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Navigație</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href="/despre-noi" className="hover:text-emerald-700">Despre noi</Link></li>
              <li><Link href="/medici" className="hover:text-emerald-700">Medici</Link></li>
              <li><Link href="/specialitati" className="hover:text-emerald-700">Specialități</Link></li>
              <li><Link href="/intrebari-frecvente" className="hover:text-emerald-700">Întrebări frecvente</Link></li>
              <li><Link href="/informatii-utile" className="hover:text-emerald-700">Informații utile</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-700">Contact</Link></li>
            </ul>
          </div>

          {/* Specialități scurt */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Specialități</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href="/specialitati/obstetrica-ginecologie" className="hover:text-emerald-700">Obstetrică–Ginecologie</Link></li>
              <li><Link href="/specialitati/cardiologie" className="hover:text-emerald-700">Cardiologie</Link></li>
              <li><Link href="/specialitati/medicina-interna" className="hover:text-emerald-700">Medicină internă</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <IconMapPin className="mt-0.5 h-5 w-5 text-emerald-700" />
                <div>
                  Str. Prelungirea Bucovinei nr. 8B, Apartament 1<br />
                  900615 Constanța
                  <div>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        "Str. Prelungirea Bucovinei nr. 8B, Apartament 1, 900615 Constanța"
                      )}`}
                      className="text-emerald-700 hover:underline"
                    >
                      Vezi pe hartă
                    </Link>
                  </div>
                </div>
              </li>

              <li className="flex items-center gap-2">
                <IconPhone className="h-5 w-5 text-emerald-700" />
                <a href="tel:+40241611445" className="hover:underline">0241.611.445</a>
              </li>

              <li className="flex items-center gap-2">
                <IconPrinter className="h-5 w-5 text-emerald-700" />
                <a href="tel:+40241511445" className="hover:underline">0241.511.445 (fax)</a>
              </li>

              <li className="flex items-center gap-2 break-all">
                <IconMail className="h-5 w-5 text-emerald-700" />
                <a href="mailto:office@asclepios-medical.ro" className="hover:underline">
                  office@asclepios-medical.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 rounded-xl bg-emerald-50 p-3 text-center text-xs text-emerald-900">
          Asclepios Medical Center nu reprezintă un serviciu de urgență. În caz de urgență medicală, sunați la 112.
        </p>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Asclepios Medical Center. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-4">
            <Link href="/termeni-si-conditii" className="hover:text-emerald-700">Termeni</Link>
            <Link href="/politica-de-confidentialitate" className="hover:text-emerald-700">Confidențialitate</Link>
            <Link href="/politica-cookie" className="hover:text-emerald-700">Cookie-uri</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

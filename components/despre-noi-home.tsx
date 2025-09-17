"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section id="despre-noi" className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* accent line */}
        <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500" />

        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-3xl md:text-4xl font-bold tracking-tight
                     text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600"
        >
          Despre noi
        </motion.h2>

        <div className="mt-5 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h3 className="text-xl md:text-2xl font-semibold text-emerald-700">
            Asclepios Medical Center
          </h3>

          <div className="mt-4 space-y-4 text-lg md:text-xl leading-relaxed text-gray-700">
            <p>
              <strong>Asclepios Medical Center</strong> este mai mult decât un
              loc de diagnostic și tratament pentru pacienți, este dedicat
              oamenilor și prestează servicii medicale de cea mai bună calitate
              într-un mediu de
              <strong> siguranță</strong>, <strong>confort</strong> și{" "}
              <strong>prietenie</strong>.
            </p>
            <p>
              Scopul nostru este să vindecăm prin servicii de excelență atât în
              plan medical, cât și în plan uman, tocmai de aceea în centrul
              atenției noastre este <strong>pacientul</strong>.
            </p>
          </div>

          {/* valori scurte ca badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["Siguranță", "Confort", "Prietenie", "Excelență"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA opțional */}
          <a
            href="/despre-noi"
            className="mt-7 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Află mai multe
          </a>
        </div>
      </div>
    </section>
  );
}

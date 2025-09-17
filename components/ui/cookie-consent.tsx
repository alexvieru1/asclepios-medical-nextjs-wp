"use client";

import * as React from "react";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

const COOKIE_NAME = "cookie_consent_v1";

function parseConsentCookie(): Consent | null {
  if (typeof document === "undefined") return null;
  const item = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!item) return null;
  try {
    const raw = decodeURIComponent(item.split("=").slice(1).join("="));
    const obj = JSON.parse(raw);
    if (typeof obj === "object" && obj) {
      return {
        necessary: true,
        analytics: !!obj.analytics,
        marketing: !!obj.marketing,
      };
    }
  } catch {}
  return null;
}

export default function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    // Show if no cookie
    const found = parseConsentCookie();
    if (!found) setOpen(true);

    // Allow footer button to reopen
    const onOpen = () => {
      const current = parseConsentCookie();
      setAnalytics(!!current?.analytics);
      setMarketing(!!current?.marketing);
      setExpanded(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", onOpen);
    return () => window.removeEventListener("open-cookie-settings", onOpen);
  }, []);

  if (!open) return null;

  async function save(consent: Consent) {
    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consent),
      });
    } catch {
      // no-op; cookie write is handled by API; if it fails, banner may reappear
    }
    setOpen(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-5xl p-4">
      <div className="rounded-2xl border border-emerald-200 bg-white/95 p-4 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-emerald-900 text-base font-semibold">Folosim cookie-uri</h2>
            <p className="mt-1 text-sm text-emerald-900/80">
              Folosim cookie-uri necesare pentru funcționarea site-ului și, cu acordul tău, cookie-uri pentru analiză
              și marketing. Poți alege „Acceptă tot”, „Respinge opționalele” sau personalizează mai jos.
            </p>

            {expanded && (
              <div className="mt-3 grid gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" checked disabled className="mt-1" />
                  <span>
                    <span className="font-medium text-emerald-900">Necesar</span>
                    <span className="block text-emerald-900/80">
                      Esențial pentru funcționare (nu poate fi dezactivat).
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.currentTarget.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-medium text-emerald-900">Analiză</span>
                    <span className="block text-emerald-900/80">
                      Ne ajută să înțelegem utilizarea site-ului (ex. Google Analytics).
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.currentTarget.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-medium text-emerald-900">Marketing</span>
                    <span className="block text-emerald-900/80">
                      Permite afișarea de conținut promoțional relevant.
                    </span>
                  </span>
                </label>
              </div>
            )}

            <button
              type="button"
              className="mt-2 text-sm text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Ascunde opțiunile" : "Personalizează opțiunile"}
            </button>
          </div>

          <div className="flex shrink-0 flex-col gap-2 md:w-64">
            <button
              type="button"
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700"
              onClick={() => save({ necessary: true, analytics: true, marketing: true })}
            >
              Acceptă tot
            </button>
            <button
              type="button"
              className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2 text-emerald-900 hover:bg-emerald-50"
              onClick={() => save({ necessary: true, analytics: false, marketing: false })}
            >
              Respinge opționalele
            </button>
            <button
              type="button"
              className="w-full rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-emerald-900 hover:bg-emerald-100"
              onClick={() => save({ necessary: true, analytics, marketing })}
            >
              Salvează preferințele
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

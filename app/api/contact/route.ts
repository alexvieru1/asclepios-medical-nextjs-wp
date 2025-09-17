// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { contactFormSchema, type ContactFormInput } from "@/lib/validators/contact-form"

export const runtime = "nodejs"

type Cf7Response = {
  status: "mail_sent" | "validation_failed" | string
  message: string
  invalid_fields?: Array<{ into: string; message: string }>
}

const CF7_FORM_ID = process.env.CF7_FORM_ID              // e.g. "525" (numeric)
const WORDPRESS_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "")
const CF7_RENDER_URL = process.env.CF7_RENDER_URL        // e.g. "https://asclepios-medical.ro/526-2/"

// Optional tuning (kept as envs to avoid code edits)
const CF7_VERSION = process.env.CF7_VERSION || "6.1.1"   // matches your proxy page
const CF7_LOCALE  = process.env.CF7_LOCALE  || "en_US"   // matches your proxy page
const CF7_CONTAINER_POST = process.env.CF7_CONTAINER_POST || ""  // numeric page id if you want a manual fallback

function endpoint() {
  if (!CF7_FORM_ID || !WORDPRESS_URL) return null
  return `${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`
}

function buildPayload(data: ContactFormInput, honeypot: string) {
  return {
    "your-name": typeof data.name === "string" ? data.name : "",
    "your-email": typeof data.email === "string" ? data.email : "",
    "your-phone": typeof data.phone === "string" ? data.phone : "",
    // schema uses "specialty" (en), CF7 uses "speciality" (british)
    speciality: typeof data.specialty === "string" ? data.specialty : "",
    doctor: typeof data.doctor === "string" ? data.doctor : "",
    "date-preferred": typeof data.preferredDate === "string" ? data.preferredDate : "",
    message: typeof data.message === "string" ? data.message : "",
    website: honeypot, // must be empty for humans
  }
}

/** robust input value extractor (works regardless of attribute order / quotes) */
function pickHidden(html: string, name: string): string {
  const a = new RegExp(`<input[^>]*name=["']${name}["'][^>]*value=["']([^"']*)["'][^>]*>`, "i").exec(html)
  if (a?.[1] !== undefined) return a[1]
  const b = new RegExp(`<input[^>]*value=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*>`, "i").exec(html)
  return b?.[1] ?? ""
}

/** fetch hidden CF7 fields from the publicly rendered proxy page */
async function getMetaFromRenderedPage(): Promise<Record<string, string> | null> {
  if (!CF7_RENDER_URL) return null
  try {
    const res = await fetch(`${CF7_RENDER_URL}?t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    const html = await res.text()

    const meta = {
      _wpcf7:                 pickHidden(html, "_wpcf7"),
      _wpcf7_unit_tag:        pickHidden(html, "_wpcf7_unit_tag"),
      _wpcf7_version:         pickHidden(html, "_wpcf7_version"),
      _wpcf7_locale:          pickHidden(html, "_wpcf7_locale"),
      _wpcf7_container_post:  pickHidden(html, "_wpcf7_container_post"),
      _wpcf7_posted_data_hash: pickHidden(html, "_wpcf7_posted_data_hash") || "",
    }

    // sanity checks
    if (!meta._wpcf7 || meta._wpcf7 !== String(CF7_FORM_ID)) return null
    if (!meta._wpcf7_unit_tag) return null

    return meta
  } catch (e) {
    console.error("CF7 meta fetch failed:", e)
    return null
  }
}

/** synthetic fallback if scraping ever fails (uses page id if provided) */
function buildFallbackMeta(id: string): Record<string, string> {
  const pageId = (CF7_CONTAINER_POST && /^\d+$/.test(CF7_CONTAINER_POST)) ? CF7_CONTAINER_POST : "0"
  const unit = pageId !== "0" ? `wpcf7-f${id}-p${pageId}-o1` : `wpcf7-f${id}-o1`
  return {
    _wpcf7: id,
    _wpcf7_unit_tag: unit,
    _wpcf7_version: CF7_VERSION,
    _wpcf7_locale: CF7_LOCALE,
    _wpcf7_container_post: pageId,
    _wpcf7_posted_data_hash: "",
  }
}

async function sendFormData(ep: string, meta: Record<string, string>, payload: Record<string, string>) {
  const fd = new FormData()
  // meta first
  for (const [k, v] of Object.entries(meta)) fd.append(k, v ?? "")
  // fields
  for (const [k, v] of Object.entries(payload)) fd.append(k, v ?? "")

  const res = await fetch(ep, {
    method: "POST",
    body: fd,
    headers: { Accept: "application/json" }, // do NOT set Content-Type for FormData
    cache: "no-store",
  })
  const text = await res.text()
  let json: Cf7Response | null = null
  try { json = JSON.parse(text) } catch {}
  return { res, text, json }
}

async function sendUrlEncoded(ep: string, meta: Record<string, string>, payload: Record<string, string>) {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(meta)) params.set(k, v ?? "")
  for (const [k, v] of Object.entries(payload)) params.set(k, v ?? "")

  const res = await fetch(ep, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
    },
    body: params.toString(),
    cache: "no-store",
  })
  const text = await res.text()
  let json: Cf7Response | null = null
  try { json = JSON.parse(text) } catch {}
  return { res, text, json }
}

export async function POST(request: Request) {
  // 1) parse & validate JSON
  let body: unknown
  try { body = await request.json() }
  catch {
    return NextResponse.json({ error: "Cererea trimisă este invalidă." }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verificați câmpurile formularului.", details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const data = parsed.data as ContactFormInput

  // 2) honeypot
  const hp = typeof data.website === "string" ? data.website.trim() : ""
  if (hp) return NextResponse.json({ success: true, message: "Mulțumim!" })

  // 3) endpoint
  const ep = endpoint()
  if (!ep) {
    return NextResponse.json(
      { error: "Serviciul de programări este indisponibil momentan." },
      { status: 503 }
    )
  }

  // 4) get meta from the rendered proxy page (primary path)
  const scraped = await getMetaFromRenderedPage()
  const meta = scraped ?? buildFallbackMeta(String(CF7_FORM_ID))

  // 5) payload
  const payload = buildPayload(data, "")

  // 6) submit (FormData first, fallback to URL-encoded if 415)
  let attempt = await sendFormData(ep, meta, payload)
  if (attempt.res.status === 415) {
    attempt = await sendUrlEncoded(ep, meta, payload)
  }

  // 7) handle response
  if (!attempt.res.ok || !attempt.json) {
    console.error("CF7 RAW:", attempt.res.status, attempt.text) // keep for diagnostics
    return NextResponse.json(
      { error: "Nu am putut trimite solicitarea. Încercați din nou mai târziu." },
      { status: 502 }
    )
  }

  const result = attempt.json
  if (result.status !== "mail_sent") {
    return NextResponse.json(
      {
        error: result.message ?? "Nu am putut trimite solicitarea. Încercați mai târziu.",
        invalidFields: result.invalid_fields,
      },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true, message: result.message })
}

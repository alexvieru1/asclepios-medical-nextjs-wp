// lib/wp-graphql.ts
type NextOpts = { revalidate?: number; tags?: string[] }

export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, any>,
  nextOpts?: NextOpts          // <-- allow a 3rd arg
): Promise<T> {
  const endpoint = `${process.env.WORDPRESS_URL}/graphql`

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: nextOpts ?? { revalidate: 3600, tags: ["wp-graphql"] }, // <-- use it
  })

  const text = await res.text()
  if (!res.ok) throw new Error(`WPGraphQL error ${res.status}: ${text.slice(0, 500)}`)

  let json: any
  try { json = JSON.parse(text) } 
  catch { throw new Error(`WPGraphQL non-JSON response: ${text.slice(0, 500)}`) }

  if (json.errors?.length) {
    const msg = json.errors.map((e: any) => e.message).join(" | ")
    throw new Error(`WPGraphQL: ${msg}`)
  }

  return json.data as T
}

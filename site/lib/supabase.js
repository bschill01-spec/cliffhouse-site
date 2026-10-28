// Server-side calls to Supabase with the public (anon) key. Row-level security only lets the
// site add an enquiry, read one concept page by its private link, and count a view. It can't
// list or read leads, so no secret key is needed on the website.
// Read on each call: on Cloudflare the values arrive with the request, not at build time.
const url = () => process.env.SUPABASE_URL || "https://ojwrukdsnwhxpzrclpsf.supabase.co";
const key = () => process.env.SUPABASE_ANON_KEY;

export const configured = () => Boolean(url() && key());

function headers(extra = {}) {
  return { apikey: key(), Authorization: `Bearer ${key()}`, ...extra };
}

export async function insertEnquiry(row) {
  const r = await fetch(`${url()}/rest/v1/enquiries`, {
    method: "POST", cache: "no-store",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=minimal" }),
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`enquiry insert ${r.status}`);
}

export async function rpc(name, args) {
  const r = await fetch(`${url()}/rest/v1/rpc/${name}`, {
    method: "POST", cache: "no-store",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(args),
  });
  if (!r.ok) throw new Error(`${name} ${r.status}`);
  return r.status === 204 ? null : r.json();
}

// One concept page by its private link, or null
export async function conceptBySlug(slug) {
  if (!configured() || !/^[a-z0-9-]{12,80}$/.test(slug)) return null;
  const rows = await rpc("concept_by_slug", { p_slug: slug });
  return rows && rows[0] ? rows[0] : null;
}

// A file from the private bucket. The storage policy only lets the public read the
// concept homepage and report of a lead that has a concept link.
export async function conceptFile(path) {
  const r = await fetch(`${url()}/storage/v1/object/authenticated/lead-files/${path.split("/").map(encodeURIComponent).join("/")}`,
                        { headers: headers(), cache: "no-store" });
  return r.ok ? r : null;
}

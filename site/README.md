# Cliffhouse Studio website (Next.js, v2 phase 4)

The same approved design as the static `index.html`, rebuilt in Next.js so the site can do
real work: the free look form saves to Supabase, and private concept pages show one lead's
concept homepage and audit report.

- Pages: `/` (everything), `/services`, `/work`, `/about`, `/free-look`.
- `/api/enquiry`: the free look form. Saves to the `enquiries` table; the Prospect Hunter
  server then checks and scores the website as an inbound lead.
- `/look/<link>`: a private concept page. Only works once Ben makes a link for that lead in the
  dashboard. Never indexed (`noindex` headers, blocked in robots.txt, not in the sitemap).
  Opening it records a view, which the dashboard shows on the lead. `?preview` skips the count.
- Uses only the public Supabase anon key. Row-level security lets the site add an enquiry, read
  one concept page by its link and count a view, nothing else.

Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, optional `NEXT_PUBLIC_SITE_URL`.

Run locally: `npm install`, then `npm run dev`.

The static site at the repo root stays live on GitHub Pages until the domain is pointed at the
new host.

import { conceptBySlug, conceptFile } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// The concept homepage itself, served from our own domain with scripts switched off.
export async function GET(_req, { params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  const file = c?.mockup_path ? await conceptFile(c.mockup_path) : null;
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(await file.text(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "sandbox allow-popups allow-popups-to-escape-sandbox; script-src 'none'",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "private, no-store",
    },
  });
}

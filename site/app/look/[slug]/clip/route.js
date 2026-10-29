import { conceptBySlug, conceptFile } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// The 20 second before and after clip. Phones ask for videos a piece at a time, so the
// Range header goes through to storage and its answer comes back as is.
export async function GET(req, { params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  const range = req.headers.get("range");
  const file = c?.clip_path ? await conceptFile(c.clip_path, range ? { Range: range } : {}) : null;
  if (!file) return new Response("Not found", { status: 404 });
  const headers = {
    "Content-Type": "video/webm",
    "Accept-Ranges": "bytes",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Cache-Control": "private, no-store",
  };
  for (const k of ["content-length", "content-range"]) {
    const v = file.headers.get(k);
    if (v) headers[k] = v;
  }
  return new Response(file.body, { status: file.status, headers });
}

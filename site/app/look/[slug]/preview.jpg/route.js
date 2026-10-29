import { conceptBySlug, conceptFile } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// The picture in the first email that people click to see their new homepage (card.py in
// Prospect Hunter draws it). Until it's made, the concept's own picture stands in.
export async function GET(_req, { params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  const path = c?.card_path || c?.desktop_path;
  const file = path ? await conceptFile(path) : null;
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(file.body, {
    headers: {
      "Content-Type": "image/jpeg",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "private, max-age=300",
    },
  });
}

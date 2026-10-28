import { conceptBySlug, conceptFile } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// The one-page audit report PDF for this concept
export async function GET(_req, { params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  const file = c?.report_path ? await conceptFile(c.report_path) : null;
  if (!file) return new Response("Not found", { status: 404 });
  const name = `${c.domain.replace(/[^a-z0-9.-]/gi, "")}-site-report.pdf`;
  return new Response(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${name}"`,
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "private, no-store",
    },
  });
}

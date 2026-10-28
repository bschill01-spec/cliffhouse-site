import { NextResponse } from "next/server";
import { configured, rpc } from "@/lib/supabase";

// Counts one visit to a concept page. Called from the page itself, so link previews and
// search bots (which don't run scripts) aren't counted.
export async function POST(req) {
  const { slug } = await req.json().catch(() => ({}));
  if (!configured() || !/^[a-z0-9-]{12,80}$/.test(String(slug || ""))) return new NextResponse(null, { status: 204 });
  try { await rpc("record_concept_view", { p_slug: slug }); } catch (e) { console.error(e); }
  return new NextResponse(null, { status: 204 });
}

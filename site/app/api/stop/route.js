import { NextResponse } from "next/server";
import { configured, rpc } from "@/lib/supabase";

// Stops review requests for one customer (see app/stop/[token])
export async function POST(req) {
  let data;
  try { data = await req.json(); } catch { return NextResponse.json({ error: "bad request" }, { status: 400 }); }
  const token = String(data.token || "");
  if (!/^[a-f0-9]{16,64}$/.test(token) || !configured()) return NextResponse.json({ error: "unknown link" }, { status: 404 });
  try {
    const business = await rpc("stop_review_requests", { p_token: token });
    if (!business) return NextResponse.json({ error: "unknown link" }, { status: 404 });
    return NextResponse.json({ ok: true, business });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "try again" }, { status: 502 });
  }
}

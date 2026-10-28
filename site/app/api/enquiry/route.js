import { NextResponse } from "next/server";
import { configured, insertEnquiry } from "@/lib/supabase";

const clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export async function POST(req) {
  let data;
  try { data = await req.json(); } catch { return NextResponse.json({ error: "That didn't come through." }, { status: 400 }); }

  // Spam bots fill the hidden field or submit instantly. Pretend it worked and drop it.
  if (data.fax || Number(data.elapsed) < 2500) return NextResponse.json({ ok: true });

  const row = {
    name: clean(data.name, 120),
    business: clean(data.business, 160),
    email: clean(data.email, 200).toLowerCase(),
    website: clean(data.website, 200),
    message: String(data.message ?? "").trim().slice(0, 2000),
    consent: true, // they asked us to reply about their site
  };
  if (!row.name || !row.business || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    return NextResponse.json({ error: "Please add your name, business name and a working email." }, { status: 400 });
  }
  if (!configured()) return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 });
  try {
    await insertEnquiry(row);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "We couldn't save that just now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

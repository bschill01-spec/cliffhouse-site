// Website forms we look after for clients (the "Booking and quote forms" add-on). A client's site
// loads /f.js, which posts here. We save the entry through submit_client_form, and the Prospect
// Hunter worker emails it to the business owner.
import { NextResponse } from "next/server";
import { configured, rpc } from "@/lib/supabase";

// Forms live on our clients' own websites, so any site may post here
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS",
               "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" };
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: CORS });
const clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const DETAILS = ["location", "timing", "preferred_day", "preferred_time"];

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req, { params }) {
  const { key } = await params;
  if (!/^[a-f0-9]{12,40}$/.test(key || "")) return reply({ error: "This form isn't set up yet." }, 404);
  let data;
  try { data = await req.json(); } catch { return reply({ error: "That didn't come through. Please try again." }, 400); }

  // Spam bots fill the hidden field, submit instantly or paste links. Pretend it worked and drop it.
  const message = String(data.message ?? "").trim().slice(0, 3000);
  if (data.fax || Number(data.elapsed) < 2500 || (message.match(/https?:\/\//g) || []).length > 2) return reply({ ok: true });

  const email = clean(data.email, 200).toLowerCase();
  const name = clean(data.name, 120);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply({ error: "Please add your name and a working email." }, 400);
  }
  const details = {};
  for (const k of DETAILS) if (data.details?.[k]) details[k] = clean(data.details[k], 200);
  if (!configured()) return reply({ error: "This form isn't connected yet. Please call or email instead." }, 503);
  try {
    const ok = await rpc("submit_client_form", {
      p_key: key, p_kind: clean(data.kind, 20), p_name: name, p_email: email, p_phone: clean(data.phone, 40),
      p_message: message, p_page: clean(data.page, 300), p_details: details,
    });
    if (!ok) return reply({ error: "This form isn't taking messages right now. Please call or email instead." }, 404);
  } catch (e) {
    console.error(e);
    return reply({ error: "We couldn't send that just now. Please try again in a minute." }, 502);
  }
  return reply({ ok: true });
}

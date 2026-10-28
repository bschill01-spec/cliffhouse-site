"use client";

import { useRef, useState } from "react";

// The free look request. It goes to our own /api/enquiry, which saves it for Ben;
// the server then checks the website and scores it like any other lead.
export default function LookForm() {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const opened = useRef(Date.now());

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const missing = ["name", "business", "email"].find((k) => !String(data[k] || "").trim());
    if (missing) {
      setNote("Please add your name, business name and email.");
      form.elements[missing].focus();
      return;
    }
    setSending(true);
    setNote("Sending...");
    try {
      const r = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - opened.current }),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "Something went wrong.");
      setSent(true);
      setNote("Thanks, we have it. We'll take a look at your site and reply by email.");
      form.reset();
    } catch (err) {
      setNote(`${err.message} You can try again in a moment.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <label className="f" htmlFor="f-name">Your name<input id="f-name" name="name" autoComplete="name" required maxLength={120} /></label>
      <label className="f" htmlFor="f-biz">Business name<input id="f-biz" name="business" required maxLength={160} /></label>
      <label className="f" htmlFor="f-site">Your website, if you have one<input id="f-site" name="website" placeholder="yourbusiness.ca" maxLength={200} /></label>
      <label className="f" htmlFor="f-email">Email<input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} /></label>
      <label className="f" htmlFor="f-msg">Anything we should know?<textarea id="f-msg" name="message" maxLength={2000}></textarea></label>
      {/* Left empty by people; filled in by spam bots */}
      <label className="hp" aria-hidden="true">Company fax<input name="fax" tabIndex={-1} autoComplete="off" /></label>
      <div><button className="btn" type="submit" disabled={sending || sent}>{sent ? "Request sent" : "Send my request"}</button></div>
      <p className="note privacy">We only use your details to reply about your site. We never share them or add you to a mailing list.</p>
      <p className="note" aria-live="polite">{note}</p>
    </form>
  );
}

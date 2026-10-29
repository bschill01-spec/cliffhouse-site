"use client";

import { useState } from "react";

export default function StopButton({ token }) {
  const [state, setState] = useState("ready");
  const [business, setBusiness] = useState("");
  const stop = async () => {
    setState("busy");
    try {
      const r = await fetch("/api/stop", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error);
      setBusiness(j.business || "");
      setState("done");
    } catch {
      setState("failed");
    }
  };
  if (state === "done") return <p role="status"><b>Done.</b> You won't get any more review requests{business ? ` from ${business}` : ""}.</p>;
  return (
    <>
      <button className="btn" type="button" onClick={stop} disabled={state === "busy"}>{state === "busy" ? "Stopping..." : "Stop the emails"}</button>
      {state === "failed" && <p role="status" style={{ marginTop: 12 }}>That link didn't work. Reply to the email with "stop" and we'll take care of it.</p>}
    </>
  );
}

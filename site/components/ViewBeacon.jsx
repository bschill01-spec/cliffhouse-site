"use client";

import { useEffect } from "react";

// Tells Ben the page was opened. Skipped for his own previews (?preview).
export default function ViewBeacon({ slug }) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("preview")) return;
    fetch("/api/view", { method: "POST", headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ slug }), keepalive: true }).catch(() => {});
  }, [slug]);
  return null;
}

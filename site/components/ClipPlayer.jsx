"use client";

import { useEffect, useState } from "react";

// The before and after clip on a concept page. It's a WebM video, which a few older phones
// can't play, so on those it quietly steps aside and the concept below does the talking.
// The #t=0.1 on the link makes phones show the first frame instead of a black box.
export default function ClipPlayer({ src }) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    if (!document.createElement("video").canPlayType('video/webm; codecs="vp8"')) setOk(false);
  }, []);
  if (!ok) return null;
  return (
    <div className="clip">
      <p className="label">Before and after, in 20 seconds</p>
      <video src={src} controls muted playsInline preload="metadata" onError={() => setOk(false)} />
    </div>
  );
}

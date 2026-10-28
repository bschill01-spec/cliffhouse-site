"use client";

import { useEffect } from "react";

// Motion: a house that builds itself, a hang tag on a string, a score that counts up, the
// homepage that assembles itself and the before/after sweep. Every part only runs when its
// pieces are on the page, and all of it is skipped when the viewer prefers reduced motion.
export default function Motion() {
  useEffect(() => {
    const off = [];
    const listen = (el, ev, fn, opts) => { el.addEventListener(ev, fn, opts); off.push(() => el.removeEventListener(ev, fn, opts)); };
    const observers = [];
    const timers = [];
    let alive = true;

    // The slider works with or without motion
    const ba = document.getElementById("ba"), range = document.getElementById("ba-range");
    if (ba && range) {
      const set = () => ba.style.setProperty("--pos", range.value + "%");
      listen(range, "input", set); set();
    }

    const reduce = !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return () => off.forEach((f) => f());
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const watch = (fn, opts) => { const o = new IntersectionObserver(fn, opts); observers.push(o); return o; };

    // The house builds itself once, the first time the scene is on screen
    const view = document.querySelector(".view");
    if (view) {
      view.classList.add("b0");
      const vo = watch((es) => {
        if (!es[0].isIntersecting) return;
        vo.disconnect();
        timers.push(setTimeout(() => [0, 700, 1700, 2500, 3200].forEach((t, i) =>
          timers.push(setTimeout(() => view.classList.add("b" + (i + 1)), t))), 250));
      }, { threshold: 0.45 });
      vo.observe(view);
    }

    // Hang tag: a damped spring pushed by scroll speed, and a score that counts up
    const tag = document.querySelector(".tag"), num = document.querySelector(".tag .num");
    if (tag && num) {
      let angle = 0, vel = 0, lastY = window.scrollY, running = false;
      const swing = () => {
        if (!alive) return;
        vel += -angle * 0.06; vel *= 0.9; angle += vel;
        tag.style.setProperty("--swing", angle.toFixed(2) + "deg");
        if (Math.abs(angle) > 0.02 || Math.abs(vel) > 0.02) requestAnimationFrame(swing);
        else { running = false; tag.style.setProperty("--swing", "0deg"); }
      };
      const kick = (f) => { vel = clamp(vel + f, -2.2, 2.2); if (!running) { running = true; requestAnimationFrame(swing); } };
      listen(window, "scroll", () => { const y = window.scrollY; kick((y - lastY) * 0.012); lastY = y; }, { passive: true });
      listen(tag, "pointerenter", () => kick(1.4));
      timers.push(setTimeout(() => kick(1.6), 650));

      const target = parseInt(num.textContent, 10);
      const io = watch((es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t) => {
          if (!alive) return;
          const k = clamp((t - t0) / 900, 0, 1), e = 1 - Math.pow(1 - k, 3);
          num.textContent = Math.max(1, Math.round(e * target));
          if (k < 1) requestAnimationFrame(step);
        };
        step(t0);
      }, { threshold: 0.6 });
      io.observe(num);
    }

    // How it works: the homepage builds itself as each step crosses the middle of the screen
    const build = document.querySelector(".build"), frame = document.getElementById("frame");
    if (build && frame) {
      const steps = [...build.querySelectorAll(".steps li")], marks = [...build.querySelectorAll(".f-stages li")];
      build.classList.add("js");
      const stage = (n) => {
        frame.dataset.stage = n;
        steps.forEach((li) => li.classList.toggle("on", li.dataset.stage === String(n)));
        marks.forEach((li) => li.classList.toggle("on", +li.dataset.s <= n));
      };
      stage(1);
      const so = watch((es) => es.forEach((e) => { if (e.isIntersecting) stage(+e.target.dataset.stage); }),
        { rootMargin: "-45% 0px -45% 0px" });
      steps.forEach((li) => so.observe(li));
    }

    // Before and after: one slow sweep the first time it is seen, unless someone grabs it first
    if (ba && range) {
      let touched = false;
      listen(range, "pointerdown", () => { touched = true; });
      listen(range, "keydown", () => { touched = true; });
      const bo = watch((es) => {
        if (!es[0].isIntersecting) return;
        bo.disconnect();
        const keys = [50, 18, 82, 50], t0 = performance.now(), seg = 700;
        const step = (t) => {
          if (touched || !alive) return;
          const i = Math.min(keys.length - 2, Math.floor((t - t0) / seg)), k = clamp((t - t0 - i * seg) / seg, 0, 1);
          const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          const v = keys[i] + (keys[i + 1] - keys[i]) * e;
          range.value = v; ba.style.setProperty("--pos", v + "%");
          if (t - t0 < seg * (keys.length - 1)) requestAnimationFrame(step);
        };
        step(t0);
      }, { threshold: 0.6 });
      bo.observe(ba);
    }

    // Reveals: only for things below the fold at load, so the first screen is complete straight away
    const ro = watch((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.remove("pre"); ro.unobserve(e.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    [".sec-head", ".offers", ".faq > *", ".look-grid > *", ".about > *", ".contact .wrap > *"].forEach((sel) => {
      [...document.querySelectorAll(sel)].forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add("rv", "pre"); el.style.setProperty("--d", i * 0.12 + "s"); ro.observe(el);
      });
    });

    return () => {
      alive = false;
      off.forEach((f) => f());
      observers.forEach((o) => o.disconnect());
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
}

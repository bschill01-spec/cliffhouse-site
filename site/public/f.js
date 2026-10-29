/* Cliffhouse Studio website forms (the "Booking and quote forms" add-on).
   A client's site carries:
     <div data-cliffhouse-form="FORM_KEY" data-kind="quote"></div>
     <script src="https://cliffhousestudio.ca/f.js" async></script>
   kind is quote, booking or contact. data-booking="https://..." adds a "Book online" button.
   data-accent="#7B5B3F" sets the button colour. The form takes the site's own font and colours.
   Entries go to cliffhousestudio.ca/api/f/FORM_KEY and are emailed to the business owner. */
(function () {
  var ENDPOINT = "https://cliffhousestudio.ca/api/f/";
  var CSS = ".chf{font:inherit;color:inherit;display:grid;gap:14px;max-width:560px}" +
    ".chf label{display:grid;gap:6px;font-size:.95em}.chf .chf-row{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}" +
    ".chf input,.chf select,.chf textarea{font:inherit;color:inherit;background:transparent;border:1px solid;border-color:rgba(127,127,127,.55);border-radius:6px;padding:10px 12px;width:100%;box-sizing:border-box}" +
    ".chf textarea{min-height:110px;resize:vertical}.chf input:focus,.chf select:focus,.chf textarea:focus{outline:2px solid var(--chf-accent,currentColor);outline-offset:1px}" +
    ".chf button,.chf .chf-book{font:inherit;font-weight:600;cursor:pointer;border:0;border-radius:6px;padding:12px 20px;background:var(--chf-accent,#222);color:var(--chf-on,#fff);text-decoration:none;display:inline-block;justify-self:start}" +
    ".chf button[disabled]{opacity:.6;cursor:default}.chf .chf-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}" +
    ".chf .chf-msg{min-height:1.2em;font-size:.95em}.chf .chf-or{font-size:.9em;opacity:.8;margin:0}";

  var FIELDS = {
    contact: [["name", "Your name", "text", true], ["email", "Email", "email", true], ["phone", "Phone (optional)", "tel"],
              ["message", "How can we help?", "textarea", true]],
    quote: [["name", "Your name", "text", true], ["email", "Email", "email", true], ["phone", "Phone (optional)", "tel"],
            ["message", "What would you like a quote for?", "textarea", true], ["location", "Where's the job? (optional)", "text"],
            ["timing", "When would you like it done?", ["As soon as possible", "Within a month", "In the next few months", "Just planning ahead"]]],
    booking: [["name", "Your name", "text", true], ["email", "Email", "email", true], ["phone", "Phone (optional)", "tel"],
              ["preferred_day", "Preferred day", "date"], ["preferred_time", "Preferred time", ["Any time", "Morning", "Afternoon", "Evening"]],
              ["message", "Anything we should know? (optional)", "textarea"]]
  };
  var BUTTON = { contact: "Send message", quote: "Ask for a quote", booking: "Request a booking" };
  var DETAILS = ["location", "timing", "preferred_day", "preferred_time"];
  var n = 0;

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    (kids || []).forEach(function (c) { e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }

  function field(f) {
    var id = "chf" + (++n);
    var input;
    if (Array.isArray(f[2])) {
      input = el("select", { id: id, name: f[0] }, f[2].map(function (o) { return el("option", {}, [o]); }));
    } else if (f[2] === "textarea") {
      input = el("textarea", { id: id, name: f[0], maxlength: "3000" });
    } else {
      input = el("input", { id: id, name: f[0], type: f[2], maxlength: "200",
        autocomplete: { name: "name", email: "email", phone: "tel" }[f[0]] || null });
    }
    if (f[3]) input.required = true;
    return el("label", { "for": id }, [f[1], input]);
  }

  function build(box) {
    if (box.getAttribute("data-chf-ready")) return;
    box.setAttribute("data-chf-ready", "1");
    var key = box.getAttribute("data-cliffhouse-form");
    var kind = FIELDS[box.getAttribute("data-kind")] ? box.getAttribute("data-kind") : "contact";
    var form = el("form", { "class": "chf", novalidate: null });
    if (box.getAttribute("data-accent")) form.style.setProperty("--chf-accent", box.getAttribute("data-accent"));
    var book = box.getAttribute("data-booking");
    if (kind === "booking" && /^https:\/\//.test(book || "")) {
      form.appendChild(el("a", { "class": "chf-book", href: book, target: "_blank", rel: "noopener" }, ["Book online"]));
      form.appendChild(el("p", { "class": "chf-or" }, ["Or send us a request and we'll get back to you."]));
    }
    var list = FIELDS[kind], i = 0;
    while (i < list.length) {
      // short fields sit side by side, long ones get the full width
      if (list[i][2] !== "textarea" && list[i + 1] && list[i + 1][2] !== "textarea") {
        form.appendChild(el("div", { "class": "chf-row" }, [field(list[i]), field(list[i + 1])])); i += 2;
      } else { form.appendChild(field(list[i])); i += 1; }
    }
    var hp = el("div", { "class": "chf-hp", "aria-hidden": "true" }, [el("input", { name: "fax", tabindex: "-1", autocomplete: "off" })]);
    var btn = el("button", { type: "submit" }, [BUTTON[kind]]);
    var msg = el("p", { "class": "chf-msg", role: "status", "aria-live": "polite" });
    form.appendChild(hp); form.appendChild(btn); form.appendChild(msg);
    var started = Date.now();

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = { kind: kind, page: location.href.slice(0, 300), elapsed: Date.now() - started, details: {} };
      new FormData(form).forEach(function (v, k) {
        if (DETAILS.indexOf(k) >= 0) { if (v) data.details[k] = String(v); } else data[k] = String(v);
      });
      btn.disabled = true; msg.textContent = "Sending...";
      fetch(ENDPOINT + encodeURIComponent(key), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return [r.ok, j]; }); })
        .then(function (res) {
          if (!res[0]) throw new Error(res[1].error || "");
          form.reset(); btn.disabled = false;
          msg.textContent = "Thanks, we've got your message and will be in touch soon.";
        })
        .catch(function (e) {
          btn.disabled = false;
          msg.textContent = e.message || "That didn't go through. Please try again, or give us a call.";
        });
    });
    box.innerHTML = "";
    box.appendChild(form);
  }

  function start() {
    if (!document.getElementById("chf-css")) {
      var s = el("style", { id: "chf-css" }); s.textContent = CSS; document.head.appendChild(s);
    }
    document.querySelectorAll("[data-cliffhouse-form]").forEach(build);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

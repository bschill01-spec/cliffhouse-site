import Link from "next/link";
import { VIEW_SVG } from "./viewSvg";
import LookForm from "./LookForm";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <p className="label">Cliffhouse Studio · Vancouver, BC</p>
          <h1 className="cond" style={{ marginTop: 18 }}><span>Cliff</span><span className="two">House</span></h1>
          <p className="slogan">Strong foundations. Better views.</p>
          <p className="lede">We design and build websites for small businesses, from brand new sites to full redesigns. The kind of site that loads fast, looks right on a phone and makes it easy for a customer to call, book or buy.</p>
          <div className="cta-row">
            <a className="btn" href="#contact">Get a free look at your site</a>
            <Link className="btn ghost" href="/services">See what we build</Link>
          </div>
        </div>

        <aside className="tag" aria-label="Sample site check">
          <div className="head">
            <span className="label">Site check</span>
            <span className="label">Sample</span>
          </div>
          <div className="score">
            <span className="num cond">7</span>
            <span className="of">out of 10<br />room to grow</span>
          </div>
          <ul>
            <li><b>On a phone</b><span>Menu covers the page</span></li>
            <li><b>First look</b><span>Photos are small and dated</span></li>
            <li><b>Trust</b><span>Reviews are hard to find</span></li>
            <li><b>Contact</b><span>No way to book online</span></li>
          </ul>
          <p className="foot">Higher score means more room to win customers. Every free look comes with one of these.</p>
        </aside>
      </div>
      <svg className="view" viewBox="0 0 1200 300" preserveAspectRatio="xMaxYMax slice" aria-hidden="true"
           focusable="false" dangerouslySetInnerHTML={{ __html: VIEW_SVG }} />
    </section>
  );
}

export function Offers({ heading = true }) {
  return (
    <section className="band" id="work">
      <div className="wrap">
        {heading && (
          <div className="sec-head">
            <h2 className="cond">What we build</h2>
            <p>Two kinds of work, both for small businesses that would rather be running the shop than fighting with a website. We set it up, explain how it works, and hand you the keys.</p>
          </div>
        )}
        <div className="offers">
          <article className="offer">
            <p className="label">01 · Start fresh</p>
            <h3 className="cond">Brand new websites</h3>
            <p>No site yet, or just a social media page? We build a clear site that tells people what you do, shows your best work and makes it easy to call, book or ask for a quote. Built to look good on a phone first.</p>
            <p className="for">For trades, shops, studios and local services</p>
            <p className="price"><span>Usually live in</span><b>2 to 3 weeks</b></p>
          </article>
          <article className="offer">
            <p className="label">02 · Start over</p>
            <h3 className="cond">Full redesigns</h3>
            <p>Your site works, but it looks dated, is hard to use on a phone or doesn't show how good your work really is. We rebuild it around what you already have, your photos, your wording and your reputation, so it looks the part and makes it easy for people to reach you.</p>
            <p className="for">For businesses whose site no longer matches their work</p>
            <p className="price"><span>Usually live in</span><b>3 to 4 weeks</b></p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WixOptions() {
  return (
    <section className="band" id="wix">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="cond">Already on Wix?</h2>
          <p>Lots of small businesses run on Wix because it handles their bookings, online store or contact forms. A redesign does not have to mean losing any of that. We will tell you which of these three fits you best on our 10 minute call.</p>
        </div>
        <div className="offers three">
          <article className="offer">
            <p className="label">A · Stay put</p>
            <h3 className="cond">Keep it on Wix</h3>
            <p>We redesign your site and it stays on your Wix account. Your bookings, products, orders and forms keep working the way they do now, with nothing to move or set up again. When you need a change, send it to us and we take care of it as part of a care plan.</p>
            <p className="for">For businesses that rely on Wix bookings or a Wix store</p>
          </article>
          <article className="offer">
            <p className="label">B · Move over</p>
            <h3 className="cond">Move off Wix</h3>
            <p>Ready to leave Wix behind? We rebuild your site somewhere you own outright, bring your pages, photos and wording across, and keep your web address so customers find you in the same place. It is the same full redesign as any other, just with the move handled for you.</p>
            <p className="for">For businesses that have outgrown Wix</p>
          </article>
          <article className="offer">
            <p className="label">C · Do it yourself</p>
            <h3 className="cond">Wix Studio rebuild</h3>
            <p>Like making your own changes? We rebuild your site in Wix Studio, Wix's newer and more flexible editor, then show you how to update text, photos and pages yourself. You stay on Wix with everything in your hands.</p>
            <p className="for">For owners who want to keep editing on their own</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function SeeItFirst() {
  return (
    <section className="look" id="look">
      <div className="wrap look-grid">
        <div>
          <p className="label">Before you spend a dollar</p>
          <h2 className="cond">See it first</h2>
          <p>Most studios ask you to imagine the result. We would rather show you. We look at your current site on a laptop and a phone, then send you a concept homepage built with your own photos and wording, plus a one-page report on what is helping and what is costing you customers.</p>
          <p>It is free and there is no obligation. If you like what you see, we talk. If not, you keep the report.</p>
          <div className="cta-row">
            <a className="btn" style={{ background: "var(--on-bark)", color: "var(--bark)", borderColor: "var(--on-bark)" }} href="#contact">Ask for your free look</a>
          </div>
        </div>
        <div>
          <div className="ba" id="ba">
            <div className="ba-pane old-site" aria-hidden="true">
              <div className="o-name">Sample Plumbing Co.</div>
              <div className="o-nav">Home | About Us | Services | Specials | Contact Us | Links</div>
              <div className="o-photo">photo</div>
              <div className="o-text">Welcome to our website!! We are a family owned plumbing company. Please call us for all of your plumbing needs. Click on Services to see what we do.</div>
              <div className="o-call">*** CALL TODAY FOR A QUOTE ***</div>
              <div className="o-foot">Copyright 2014 · Best viewed in Internet Explorer</div>
            </div>
            <div className="ba-pane new-site ba-new" aria-hidden="true">
              <div className="n-top"><span>Sample Plumbing Co.</span><span>Call now</span></div>
              <div className="n-hero">
                <b>Plumbing done right the first time</b>
                <small>Repairs, water heaters and renovations across the city.</small>
                <div className="n-btns"><span>Book a visit</span><span>Get a quote</span></div>
              </div>
              <div className="n-tiles">
                <div><i></i>Repairs</div><div><i></i>Water heaters</div><div><i></i>Renovations</div>
              </div>
              <div className="n-foot">Sample Plumbing Co. · Book online any time</div>
            </div>
            <div className="ba-line"><span className="ba-knob">&lsaquo;&rsaquo;</span></div>
            <span className="ba-tag l">Today</span><span className="ba-tag r">Our concept</span>
            <input type="range" id="ba-range" min="0" max="100" defaultValue="50" aria-label="Drag to compare the current site with our concept" />
          </div>
          <p className="ba-cap">Drag to compare. A made up sample business, shown for illustration. Your concept uses your own photos and wording.</p>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="band" id="how">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="cond">How it works</h2>
          <p>No long sales calls and no pressure. You see real work before you decide anything.</p>
        </div>
        <div className="build">
          <ol className="steps">
            <li data-stage="1"><h3>We look</h3><p>We check your site on a laptop and a phone, the way your customers see it.</p></li>
            <li data-stage="2"><h3>We show you</h3><p>You get a concept homepage and a one-page report, free.</p></li>
            <li data-stage="3"><h3>We talk</h3><p>A 10 minute call to hear what you need and give you a clear quote.</p></li>
            <li data-stage="4"><h3>We build</h3><p>We build it, walk you through it and stick around for questions.</p></li>
          </ol>
          <div className="frame-wrap" aria-hidden="true">
            <div className="frame" id="frame" data-stage="4">
              <div className="f-bar"><i></i><i></i><i></i><span className="f-url">yourbusiness.ca</span><span className="f-live">Live</span></div>
              <div className="f-page">
                <div className="f-nav"><span className="f-logo"></span><span className="f-link"></span><span className="f-link"></span><span className="f-link"></span></div>
                <div className="f-hero">
                  <span className="f-h">Your business,<br />at its best</span>
                  <span className="f-sub">Clear, fast and easy to book.</span>
                  <span className="f-btn">Book a visit</span>
                </div>
                <div className="f-cards"><span className="f-card"><i></i></span><span className="f-card"><i></i></span><span className="f-card"><i></i></span></div>
              </div>
            </div>
            <ol className="f-stages">
              <li data-s="1">Outline</li><li data-s="2">Concept</li><li data-s="3">Details</li><li data-s="4">Live</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["How much does a website cost?", "Every project gets one fixed price in writing after a 10 minute call, so there are no hourly bills or surprises. Ask us for our pricing guide and we'll send it over. Half is paid to start and half when your site goes live."],
  ["How long does it take?", "Most new sites are live in 2 to 3 weeks, and most redesigns in 3 to 4. The biggest factor is how quickly we get your photos and details, and we'll tell you exactly what we need up front."],
  ["Is the free look really free?", "Yes. You get a concept homepage and a one-page report on your current site at no cost. There's no obligation, and you keep both either way."],
  ["Do I need my photos and wording ready?", "No. We work with what you already have, like your current site, social media and photos, and we help write anything that's missing."],
  ["Can I update the site myself?", "Yes. We set it up so you can change text and photos on your own, and we walk you through it before launch. If you'd rather not, just send us the change."],
  ["My site is on Wix. Can you still help?", "Yes. We can redesign it and keep it on Wix so your bookings, store and forms keep working, move it off Wix to a site you own outright, or rebuild it in Wix Studio so you can edit it yourself. We'll help you pick the right one on a quick call."],
  ["Who owns the site and the domain?", "You do. Your domain and your site are registered in your name, and we help set up hosting so you're never locked in to us."],
  ["Do you only work with businesses in Vancouver?", "We're based in Vancouver and work with businesses anywhere in BC and beyond. Everything happens by email and a quick call, so distance doesn't matter."],
];

export function Faq() {
  return (
    <section className="band" id="faq">
      <div className="wrap faq">
        <h2 className="cond">Good questions</h2>
        <div className="faq-list">
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="band" id="about">
      <div className="wrap about">
        <p className="big cond">Local<br />and small<br />on purpose</p>
        <div className="copy">
          <p>Cliffhouse Studio is a small web studio based in Vancouver. We work with a handful of businesses at a time so every one gets proper attention and a straight answer.</p>
          <p>The name comes from the idea behind every build. Get the foundation right first, a site that is fast, clear and easy to manage. Then make the view worth stopping for.</p>
          <p>When you email us, you hear back from the person doing the work.</p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div>
          <p className="label">Start here</p>
          <h2 className="cond" style={{ marginTop: 12 }}>Get a free look</h2>
          <p>Send us your website and we will come back with a concept homepage and a short report. No cost, no obligation.</p>
        </div>
        <LookForm />
      </div>
    </section>
  );
}

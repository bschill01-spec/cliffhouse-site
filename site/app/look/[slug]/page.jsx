import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/Chrome";
import ViewBeacon from "@/components/ViewBeacon";
import ClipPlayer from "@/components/ClipPlayer";
import { conceptBySlug } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  return {
    title: c ? `A concept homepage for ${c.business}` : "Not found",
    robots: { index: false, follow: false, nocache: true },
    openGraph: null,
  };
}

export default async function ConceptPage({ params }) {
  const { slug } = await params;
  const c = await conceptBySlug(slug).catch(() => null);
  if (!c || !c.mockup_path) notFound();
  return (
    <>
      <Header />
      <main id="top" className="concept">
        <div className="wrap">
          <div>
            <p className="label">Made for {c.business}</p>
            <h1 className="cond" style={{ marginTop: 14 }}>Your homepage,<br />reimagined</h1>
          </div>
          <div className="intro">
            <p>This is a concept homepage we put together for {c.business}, built from the photos and wording already on {c.domain}. It is a starting point to show what is possible, not a finished site, and it is yours to keep either way.</p>
            <p>Scroll inside the frame to see the whole page. It works on a phone too.</p>
          </div>
          {c.clip_path && <ClipPlayer src={`/look/${slug}/clip#t=0.1`} />}
          <div className="frame">
            <div className="f-bar"><i></i><i></i><i></i><span className="f-url">{c.domain}</span><span className="f-live" style={{ opacity: 1, transform: "none" }}>Concept</span></div>
            <iframe src={`/look/${slug}/concept`} title={`Concept homepage for ${c.business}`} loading="eager"
                    sandbox="allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" />
          </div>
          <div className="actions">
            {c.report_path && <a className="btn" href={`/look/${slug}/report`}>Download the one-page report</a>}
            <a className="btn ghost" href={`/look/${slug}/concept`} target="_blank" rel="noopener">Open it full screen</a>
          </div>
          <p className="small">If you would like to talk about it, just reply to our email. A concept by Cliffhouse Studio, Vancouver.</p>
        </div>
      </main>
      <Footer />
      <ViewBeacon slug={slug} />
    </>
  );
}

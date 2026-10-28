import { Header, Footer, PageHead } from "@/components/Chrome";
import { SeeItFirst, Contact } from "@/components/Sections";
import Motion from "@/components/Motion";

export const metadata = {
  title: "Our work",
  description: "The kind of change we make for small business websites, and how to see your own concept first.",
};

export default function Work() {
  return (
    <>
      <Header current="/work" />
      <main id="top">
        <PageHead label="Our work" title="Before and after">
          Client projects will be shown here as they go live, with each owner's permission. Until then, here is the kind of change we make, using a made up sample business.
        </PageHead>
        <div style={{ height: 32 }} />
        <SeeItFirst />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}

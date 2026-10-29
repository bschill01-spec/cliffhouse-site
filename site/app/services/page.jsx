import { Header, Footer, PageHead } from "@/components/Chrome";
import { Offers, WixOptions, HowItWorks, Faq, Contact } from "@/components/Sections";
import Motion from "@/components/Motion";

export const metadata = {
  title: "What we build",
  description: "Brand new websites and full redesigns for small businesses. Fixed prices, live in weeks.",
};

export default function Services() {
  return (
    <>
      <Header current="/services" />
      <main id="top">
        <PageHead label="Services" title="What we build">
          Two kinds of work, both for small businesses that would rather be running the shop than fighting with a website. We set it up, explain how it works, and hand you the keys.
        </PageHead>
        <Offers heading={false} />
        <WixOptions />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}

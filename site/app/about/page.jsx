import { Header, Footer } from "@/components/Chrome";
import { About, HowItWorks, Contact } from "@/components/Sections";
import Motion from "@/components/Motion";

export const metadata = {
  title: "About",
  description: "A small web studio based in Vancouver, working with a handful of businesses at a time.",
};

export default function AboutPage() {
  return (
    <>
      <Header current="/about" />
      <main id="top">
        <About />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}

import { Header, Footer } from "@/components/Chrome";
import { Hero, Offers, SeeItFirst, HowItWorks, Faq, About, Contact } from "@/components/Sections";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Offers />
        <SeeItFirst />
        <HowItWorks />
        <Faq />
        <About />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}

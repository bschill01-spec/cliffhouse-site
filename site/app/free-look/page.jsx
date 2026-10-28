import { Header, Footer } from "@/components/Chrome";
import { Contact } from "@/components/Sections";

export const metadata = {
  title: "Get a free look at your site",
  description: "Send us your website and we will come back with a concept homepage and a short report. No cost, no obligation.",
};

export default function FreeLook() {
  return (
    <>
      <Header />
      <main id="top"><Contact /></main>
      <Footer />
    </>
  );
}

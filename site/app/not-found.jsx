import Link from "next/link";
import { Header, Footer, PageHead } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top">
        <PageHead label="404" title="Nothing here">
          This page doesn't exist, or the link has expired.
        </PageHead>
        <div className="wrap" style={{ paddingBlock: "24px 72px" }}><Link className="btn" href="/">Back to the home page</Link></div>
      </main>
      <Footer />
    </>
  );
}

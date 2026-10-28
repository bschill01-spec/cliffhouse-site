const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cliffhousestudio.ca";

// Public pages only. Concept pages under /look/ are private and never listed.
export default function sitemap() {
  return ["", "/services", "/work", "/about", "/free-look"].map((p) => ({ url: `${SITE}${p}`, changeFrequency: "monthly" }));
}

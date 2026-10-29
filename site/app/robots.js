const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cliffhousestudio.ca";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/look/", "/api/", "/stop/"] }], sitemap: `${SITE}/sitemap.xml` };
}

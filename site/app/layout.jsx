import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cliffhousestudio.ca";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Cliffhouse Studio | Websites for small businesses, Vancouver", template: "%s | Cliffhouse Studio" },
  description: "Cliffhouse Studio designs and builds websites for small businesses in Vancouver, BC. Redesigns and new sites.",
  icons: { icon: "/favicon-64.png", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Cliffhouse Studio",
    description: "Website redesigns and new websites for small businesses. Vancouver, BC.",
    siteName: "Cliffhouse Studio",
  },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#3A2819" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}

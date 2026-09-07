import "../src/index.css";
import Script from "next/script";
import { Inter, Space_Grotesk, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import Layout from "@/components/layout/Layout";
import { business, seo } from "@/lib/siteData";

const GTM_ID = "GTM-N79DLQN7";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${seo.baseUrl}/#organization`,
      name: business.name,
      url: seo.baseUrl,
      email: business.email,
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Magnolia",
        addressRegion: "TX",
        addressCountry: "US",
      },
      description: seo.description,
    },
    {
      "@type": "WebSite",
      "@id": `${seo.baseUrl}/#website`,
      url: seo.baseUrl,
      name: seo.siteName,
      publisher: { "@id": `${seo.baseUrl}/#organization` },
    },
  ],
};

export const metadata = {
  metadataBase: new URL(seo.baseUrl),
  title: seo.title,
  description: seo.description,
  other: {
    "impact-site-verification": "53d565cc-b42f-4b07-88b2-242a7f96a7dd",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: seo.siteName,
    type: "website",
    url: seo.baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <head>
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

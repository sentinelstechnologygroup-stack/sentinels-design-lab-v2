import "../src/index.css";
import Layout from "@/components/layout/Layout";
import { business, seo } from "@/lib/siteData";

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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

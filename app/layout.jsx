import "../src/index.css";
import Layout from "@/components/layout/Layout";
import { seo } from "@/lib/siteData";

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
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

import { seo } from "@/lib/siteData";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${seo.baseUrl}/sitemap.xml`,
  };
}

import { seo } from "@/lib/siteData";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${seo.baseUrl}/sitemap.xml`,
  };
}

import BlogPage from "@/components/pages/Blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Blog | Sentinels Design Lab",
  "Articles on website redesigns, WordPress modernization, SEO foundation, portals, dashboards, automations, and practical digital systems.",
  "/blog",
);

export default function Page() {
  return <BlogPage />;
}

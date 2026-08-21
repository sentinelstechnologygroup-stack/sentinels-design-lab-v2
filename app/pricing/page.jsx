import Pricing from "@/components/pages/Pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Plans, SEO & PPC | Sentinels Design Lab",
  "Managed website plans from $150/month with launch SEO setup included. Expanded SEO and PPC/social campaign management are available as add-ons, with paid campaign management starting at $500/month plus ad spend.",
  "/pricing",
);

export default function Page() {
  return <Pricing />;
}

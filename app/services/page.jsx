import Services from "@/components/pages/Services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website, SEO, PPC & Custom Systems Services | Sentinels Design Lab",
  "Managed websites from $150/month with SEO-ready launch setup, plus Expanded SEO, PPC and social campaign management, custom software, CRM, portals, automation, integrations, and AI.",
  "/services",
);

export default function Page() {
  return <Services />;
}

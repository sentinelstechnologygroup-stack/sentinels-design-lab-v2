import Home from "@/components/pages/Home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Managed Websites from $150/Month | Sentinels Design Lab",
  "Sentinels Design Lab builds managed websites from $150/month with hosting, maintenance, security, backups, monitoring, and support included, plus expanded SEO, PPC/social campaigns, and custom software, CRM, portals, automation, and AI.",
  "/",
);

export default function Page() {
  return <Home />;
}

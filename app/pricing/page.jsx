import Pricing from "@/pages/Pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pricing | Sentinels Design Lab",
  "Website pricing starting points for SDL plus discovery-led scoping for portals, dashboards, automations, integrations, and custom digital systems.",
  "/pricing",
);

export default function Page() {
  return <Pricing />;
}

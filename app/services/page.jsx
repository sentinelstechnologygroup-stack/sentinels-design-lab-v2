import Services from "@/pages/Services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Services | Sentinels Design Lab",
  "Custom websites, redesigns, portals, dashboards, automations, integrations, and ongoing website or system support for businesses that need practical digital infrastructure.",
  "/services",
);

export default function Page() {
  return <Services />;
}

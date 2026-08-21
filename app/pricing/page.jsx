import Pricing from "@/components/pages/Pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Pricing | Sentinels Design Lab",
  "SDL website packages start at $2,500 and include managed hosting, maintenance, security, backups, monitoring, deployment management, and basic technical support.",
  "/pricing",
);

export default function Page() {
  return <Pricing />;
}

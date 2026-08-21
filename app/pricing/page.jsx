import Pricing from "@/components/pages/Pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Plans | Sentinels Design Lab",
  "Managed website plans from $150/month, including hosting, maintenance, security, backups, monitoring, deployment management, and support. Traditional project pricing is also available.",
  "/pricing",
);

export default function Page() {
  return <Pricing />;
}

import Home from "@/components/pages/Home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sentinels Design Lab | Custom Websites & Digital Systems",
  "Sentinels Design Lab builds modern websites, web applications, portals, dashboards, automations, and custom digital systems using lean code, controlled deployments, and managed infrastructure.",
  "/",
);

export default function Page() {
  return <Home />;
}

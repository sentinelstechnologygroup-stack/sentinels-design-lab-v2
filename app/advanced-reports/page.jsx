import AdvancedReports from "@/components/pages/AdvancedReports";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Advanced Sentinels Intelligence Suite Reports | Secure Business Data Connections",
  "Securely connect Google Search Console, Analytics, Business Profile, Ads, and Tag Manager for verified Sentinels Intelligence Suite reports without sharing passwords.",
  "/advanced-reports",
);

export default function Page() {
  return <AdvancedReports />;
}

import Work from "@/pages/Work";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Work | Sentinels Design Lab",
  "Real SDL rebuilds, modernization work, and digital improvements completed for real businesses. No fake case studies or invented metrics.",
  "/work",
);

export default function Page() {
  return <Work />;
}

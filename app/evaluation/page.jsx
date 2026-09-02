import Evaluation from "@/components/pages/Evaluation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Free Website Evaluation | Sentinels Design Lab",
  "Get a free basic website evaluation powered by the Sentinels Intelligence Suite.",
  "/evaluation",
);

export default function Page() {
  return <Evaluation />;
}

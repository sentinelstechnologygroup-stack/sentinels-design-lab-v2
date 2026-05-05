import SIS from "@/components/pages/SIS";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sentinel Intelligence System (SIS) | Custom Business Systems",
  "SIS connects your website, workflows, and operations into one system designed to drive real business results.",
  "/systems/sis",
);

export default function Page() {
  return <SIS />;
}

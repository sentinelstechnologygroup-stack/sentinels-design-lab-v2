import Home from "@/components/pages/Home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sentinels Design Lab | Custom Websites & Digital Systems",
  "Sentinels Design Lab builds conversion-focused websites and digital systems for growing service businesses.",
  "/",
);

export default function Page() {
  return <Home />;
}

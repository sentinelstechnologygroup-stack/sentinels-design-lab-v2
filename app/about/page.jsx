import About from "@/pages/About";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About | Sentinels Design Lab",
  "Learn how Sentinels Design Lab approaches modern websites, digital systems, controlled deployments, and practical custom software for growing businesses.",
  "/about",
);

export default function Page() {
  return <About />;
}

import Contact from "@/components/pages/Contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact | Sentinels Design Lab",
  "Request a website evaluation or scope a custom digital solution with Sentinels Design Lab.",
  "/contact",
);

export default function Page() {
  return <Contact />;
}

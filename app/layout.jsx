// app/layout.jsx
import "../src/index.css";
import SiteLayout from "@/components/layout/Layout";

export const metadata = {
  title: "Sentinels Design Lab",
  description: "Where Vision Meets Digital Precision",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
// app/layout.jsx
import "../src/index.css";
import Layout from "@/components/layout/Layout";

export const metadata = {
  title: "Sentinels Design Lab",
  description:
    "Sentinels Design Lab builds high-performance websites, automation systems, and AI-enabled digital infrastructure for serious businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
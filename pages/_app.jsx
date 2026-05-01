import "../src/index.css";
import Layout from "@/components/layout/Layout";

export default function LegacyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

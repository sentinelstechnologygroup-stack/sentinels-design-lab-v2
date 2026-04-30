     1|import { seo } from "./siteData";
     2|
     3|export function pageMetadata(title, description, path = "/") {
     4|  const url = `${seo.baseUrl}${path}`;
     5|  return {
     6|    title,
     7|    description,
     8|    alternates: { canonical: url },
     9|    openGraph: {
    10|      title,
    11|      description,
    12|      url,
    13|      siteName: seo.siteName,
    14|      type: "website",
    15|    },
    16|    twitter: {
    17|      card: "summary_large_image",
    18|      title,
    19|      description,
    20|    },
    21|  };
    22|}
    23|
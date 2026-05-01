import { seo } from "./siteData";

export function pageMetadata(title, description, path = "/", imagePath) {
  const url = `${seo.baseUrl}${path}`;
  const image = imagePath ? `${seo.baseUrl}${imagePath}` : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: seo.siteName,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

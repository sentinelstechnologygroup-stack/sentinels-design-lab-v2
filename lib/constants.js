import {
  business,
  footerLinks,
  navLinks,
  primaryCta,
  capabilityCards,
} from "./siteData";

export const BUSINESS = {
  name: business.name,
  tagline: business.footerTagline,
  email: business.email,
  phone: business.phone,
  phoneHref: business.phoneHref,
  address: business.address,
};

export const NAV_LINKS = navLinks;

export const SERVICES = capabilityCards.map((item) => ({
  name: item.title,
  slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  path: "/services",
}));

export const FOOTER_QUICK_LINKS = footerLinks;

export const CTA = {
  primary: primaryCta,
  secondary: { label: "View Work", path: "/work" },
};

export const IMAGES = {
  logo: "/images/logo/logo-mark.webp",
};

export const FORM_ENDPOINT = "";

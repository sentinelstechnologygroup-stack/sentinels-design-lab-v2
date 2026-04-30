     1|import {
     2|  business,
     3|  footerLinks,
     4|  navLinks,
     5|  primaryCta,
     6|  capabilityCards,
     7|} from "./siteData";
     8|
     9|export const BUSINESS = {
    10|  name: business.name,
    11|  tagline: business.footerTagline,
    12|  email: business.email,
    13|  phone: business.phone,
    14|  phoneHref: business.phoneHref,
    15|  address: business.address,
    16|};
    17|
    18|export const NAV_LINKS = navLinks;
    19|
    20|export const SERVICES = capabilityCards.map((item) => ({
    21|  name: item.title,
    22|  slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    23|  path: "/services",
    24|}));
    25|
    26|export const FOOTER_QUICK_LINKS = footerLinks;
    27|
    28|export const CTA = {
    29|  primary: primaryCta,
    30|  secondary: { label: "View Work", path: "/work" },
    31|};
    32|
    33|export const IMAGES = {
    34|  logo: "/images/logo/logo.png",
    35|};
    36|
    37|export const FORM_ENDPOINT = "";
    38|
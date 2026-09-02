import LegalPage from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy Policy | Sentinels Design Lab",
  "How Sentinels Design Lab collects, uses, protects, and deletes website, report, and connected-account information.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Trust & Data Protection" title="Privacy Policy" updated="August 31, 2026">
      <section><p>Sentinels Design Lab ("SDL," "we," "us," or "our") provides website evaluations, digital services, and Sentinel Intelligence System reports. This policy explains the information we collect, why we use it, how we protect it, and the choices available to customers and website visitors.</p></section>

      <section><h2>Information we collect</h2><p>We may collect information submitted directly to us, including a name, business name, email address, telephone number, website address, service area, report selections, communications, and payment or transaction identifiers. Payment-card information is processed by the applicable payment provider and is not stored directly by SDL.</p><p>When a customer authorizes a connected report, we may temporarily access selected information from Google Search Console, Google Analytics, Google Business Profile, Google Ads, or Google Tag Manager. The specific information depends on the report and the permissions shown on the provider authorization screen.</p><p>We may also collect public website, search-result, backlink, review, business-profile, advertising, and technical information from the customer’s website and professional data providers.</p></section>

      <section><h2>How connected Google data is used</h2><p>Google account information is used only to prepare, deliver, explain, or improve the report or monitoring service expressly requested by the customer. Depending on the authorized connection, this may include search queries, clicks, impressions, landing pages, analytics events, conversions, business locations, reviews, advertising performance, search terms, and tag configuration.</p><p>SDL requests each Google permission separately and in context. We do not use connected Google data for unrelated advertising, credit decisions, data brokerage, or surveillance. We do not sell Google user data.</p><p><strong>Sentinels Design Lab’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.</strong></p></section>

      <section><h2>Temporary authorization and retention</h2><p>One-Time Report Access does not request offline access or a refresh token. The encrypted authorization token is held in a secure, HTTP-only session and expires no later than one hour after connection. A customer may disconnect sooner from the Connected Accounts screen. When disconnected, SDL requests revocation from Google and removes the temporary token.</p><p>Report inputs, calculated findings, generated reports, customer communications, and transaction records may be retained as reasonably necessary to provide the purchased service, maintain business records, resolve disputes, protect the service, and comply with law. Customers may request deletion as described below. Ongoing monitoring, when separately selected, will require a separate disclosure and authorization.</p></section>

      <section><h2>Sharing and service providers</h2><p>We may share only the information necessary with service providers that support report data, website hosting, email delivery, secure storage, payment processing, analytics, and customer support. They may process information only to provide services to SDL and are expected to protect it appropriately. We may also disclose information when required by law, to protect rights and safety, or as part of a business transaction with appropriate protections.</p></section>

      <section><h2>Security</h2><p>SDL uses reasonable administrative, technical, and organizational safeguards, including encrypted transport, server-only secrets, encrypted temporary authorization tokens, limited permissions, short access periods, and access controls. No online system can guarantee absolute security, but we design connected reports to minimize both the information requested and the time it remains accessible.</p></section>

      <section><h2>Your choices and deletion requests</h2><p>You may decline a connection, disconnect a connected account, revoke SDL through your Google Account permissions, or request access to or deletion of information associated with your report. Send requests to <a href="mailto:Info@SentinelsDesignLab.com">Info@SentinelsDesignLab.com</a>. We may need to verify the request and may retain limited records when legally required.</p></section>

      <section><h2>Children, changes, and contact</h2><p>SDL services are intended for businesses and are not directed to children under 13. We may update this policy when services or legal requirements change. Material changes affecting connected data will be disclosed and, when required, presented for renewed consent before the new use begins.</p><p>Questions may be sent to Sentinels Design Lab at <a href="mailto:Info@SentinelsDesignLab.com">Info@SentinelsDesignLab.com</a>, Magnolia, Texas.</p></section>
    </LegalPage>
  );
}


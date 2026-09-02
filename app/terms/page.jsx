import LegalPage from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms of Service | Sentinels Design Lab",
  "Terms governing Sentinels Design Lab website evaluations, SIS reports, connected data, and digital services.",
  "/terms",
);

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Service Terms" title="Terms of Service" updated="August 31, 2026">
      <section><p>These Terms of Service govern use of the Sentinels Design Lab website, website evaluations, Sentinel Intelligence System reports, connected-account features, and related digital services. By requesting or purchasing a service, you agree to these terms on behalf of yourself and, when applicable, the business you represent.</p></section>

      <section><h2>Services and authorization</h2><p>You authorize SDL to inspect the public website and public business information submitted for evaluation. If you connect an external account, you represent that you are authorized to grant access to that account and instruct SDL to use the approved information solely for the selected report or service.</p><p>Connected accounts use the provider’s official authorization process. You must not send SDL a provider password. One-Time Report Access is temporary and can be disconnected before its automatic expiration.</p></section>

      <section><h2>Reports and professional judgment</h2><p>Reports combine measured data, third-party data, calculated metrics, estimates, and professional interpretation. SDL identifies the source or nature of material findings where practical. Search rankings, traffic estimates, advertising observations, competitive information, and platform data can change over time and may differ among providers.</p><p>Reports are business and marketing information, not a guarantee of search position, traffic, advertising results, leads, revenue, or legal compliance. Recommendations require the customer’s judgment and may need additional technical, financial, or legal review before implementation.</p></section>

      <section><h2>Customer responsibilities</h2><p>You agree to provide accurate information, use only websites and accounts you are authorized to evaluate, review report assumptions, protect account access, and use the service lawfully. You may not use SDL services to access another party’s private information, misrepresent authorization, interfere with systems, or conduct unlawful surveillance.</p></section>

      <section><h2>Purchases, delivery, and changes</h2><p>Pricing, included scope, delivery estimates, and refund terms shown at checkout or in a written proposal become part of these terms. Additional pages, locations, competitors, keywords, data sources, or implementation work may require a revised scope. Taxes may apply. SDL may pause work when required information or authorization is unavailable.</p></section>

      <section><h2>Intellectual property</h2><p>SDL retains ownership of its report frameworks, templates, scoring methods, software, and pre-existing materials. After full payment, the customer may use delivered reports internally and for legitimate business decision-making. Third-party data remains subject to the applicable provider terms.</p></section>

      <section><h2>Availability and limitation</h2><p>External platforms may change, restrict, delay, or discontinue data and authorization services. SDL will use reasonable efforts to provide accurate and secure services but does not warrant uninterrupted availability or perfect completeness. To the extent permitted by law, SDL is not liable for indirect, incidental, special, consequential, or lost-profit damages arising from use of a report or third-party platform.</p></section>

      <section><h2>Privacy, suspension, and contact</h2><p>Our <a href="/privacy">Privacy Policy</a> explains information handling and is incorporated into these terms. SDL may suspend access that presents a security, legal, payment, or misuse risk. Questions may be sent to <a href="mailto:Info@SentinelsDesignLab.com">Info@SentinelsDesignLab.com</a>.</p></section>
    </LegalPage>
  );
}


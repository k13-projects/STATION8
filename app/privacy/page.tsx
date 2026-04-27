import type { Metadata } from "next";
import { LegalShell } from "../_legal/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How STATION8 Public Market handles personal information, browser storage, and visitor data.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 26, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy Policy" eyebrow="Legal" lastUpdated={LAST_UPDATED}>
      <p className="legal-lede">
        This Privacy Policy explains what information STATION8 Public Market
        (&ldquo;STATION8,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects when you visit this
        website, how we use it, and the choices you have. We&rsquo;ve written it in plain language.
        Where the law requires more formal terms, those appear too.
      </p>

      <h2>1. Who we are</h2>
      <p>
        STATION8 Public Market is operated by <strong>[Legal Entity Name]</strong> (the &ldquo;
        Operator&rdquo;), a company organized under the laws of the State of California. Our market
        venue is located in the UC San Diego Theater District in La Jolla, California. Questions
        about this policy can be sent to <strong>privacy@[domain]</strong>.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect very little personal information through this website. Specifically:</p>
      <ul>
        <li>
          <strong>Information you choose to send us</strong> via email links on the site (general
          inquiries, vendor opportunities, careers, bookings). When you email us, we receive your
          email address, name, and whatever you write in the message.
        </li>
        <li>
          <strong>Standard server logs.</strong> Our hosting provider records the IP address, user
          agent, request URL, response code, and timestamp of every request. These logs are used for
          security monitoring and abuse prevention and are typically retained for 30 days.
        </li>
        <li>
          <strong>Local browser storage.</strong> The site saves a single key (
          <code>station8.motion-toggle</code>) in your browser&rsquo;s <em>localStorage</em> to
          remember your animation preference. This never leaves your device. See our{" "}
          <a href="/cookies">Cookie &amp; Storage Policy</a> for details.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> use third-party analytics, tracking pixels, advertising cookies,
        or behavioral profiling at this time. If we add any of these in the future (for example, an
        error-monitoring service or a privacy-friendly analytics tool), this policy will be updated
        before they go live.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to inquiries you send us.</li>
        <li>To evaluate vendor and career applications.</li>
        <li>To process and confirm private-event booking requests.</li>
        <li>To operate, secure, and improve the website itself.</li>
        <li>To comply with applicable law.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not share it with advertisers. We do not use
        it to build a marketing profile of you.
      </p>

      <h2>4. How we share information</h2>
      <p>
        We share information only with service providers that operate parts of our infrastructure on
        our behalf, and only to the extent they need it to do their job. These currently include:
      </p>
      <ul>
        <li>Our hosting provider (for serving the website).</li>
        <li>Our email provider (for receiving the messages you send to our inboxes).</li>
      </ul>
      <p>
        Each of these providers is contractually bound to handle information consistent with this
        policy. We may also disclose information when required by valid legal process or to protect
        our rights, property, or safety, or that of others.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on where you live, you may have rights regarding your personal information,
        including:
      </p>
      <ul>
        <li>The right to know what personal information we hold about you.</li>
        <li>The right to request deletion of that information.</li>
        <li>The right to correct inaccurate information.</li>
        <li>
          The right to opt out of any sale or sharing of personal information (we don&rsquo;t do
          this).
        </li>
        <li>The right to non-discrimination for exercising any of the above.</li>
      </ul>
      <p>
        To exercise any of these rights, email <strong>privacy@[domain]</strong>. We may need to
        verify your identity before acting on the request. California residents specifically may
        invoke their rights under the California Consumer Privacy Act (CCPA), as amended by the
        California Privacy Rights Act (CPRA).
      </p>

      <h2>6. Children&rsquo;s privacy</h2>
      <p>
        This website is intended for a general audience and is not directed at children under 13. We
        do not knowingly collect personal information from children under 13. If you believe a child
        has sent us personal information, please contact us and we will delete it.
      </p>

      <h2>7. Data security</h2>
      <p>
        We use industry-standard safeguards to protect the information we receive — including HTTPS
        for all traffic, modern security headers, and access controls on the email accounts that
        receive inquiries. No method of transmission or storage is 100% secure, but we work to keep
        risks low.
      </p>

      <h2>8. International visitors</h2>
      <p>
        The website is operated from the United States. If you visit from outside the U.S.,
        information you send to us will be processed in the United States, where data-protection
        laws may differ from those of your country.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy as the site evolves and as new integrations come online (for
        example, when our booking form launches). The &ldquo;last updated&rdquo; date at the top of
        this page reflects the most recent change. Material changes will be highlighted on the home
        page for a reasonable period.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions or to exercise any of the rights described above, please email{" "}
        <strong>privacy@[domain]</strong> or write to us at:
      </p>
      <address className="legal-address">
        STATION8 Public Market
        <br />
        [Street Address]
        <br />
        La Jolla, CA [ZIP]
        <br />
        United States
      </address>

      <p className="legal-disclaimer">
        <em>
          This document is a working draft pending review by qualified legal counsel. Terms in
          square brackets must be filled in before publication.
        </em>
      </p>
    </LegalShell>
  );
}

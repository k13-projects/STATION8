import type { Metadata } from "next";
import { LegalShell } from "../_legal/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the STATION8 Public Market website.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 26, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalShell title="Terms of Service" eyebrow="Legal" lastUpdated={LAST_UPDATED}>
      <p className="legal-lede">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the STATION8 Public Market
        website (the &ldquo;Site&rdquo;). By using the Site, you agree to these Terms. If you do not
        agree, please do not use the Site.
      </p>

      <h2>1. About us</h2>
      <p>
        The Site is operated by <strong>[Legal Entity Name]</strong> (&ldquo;STATION8,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;), a company organized under the laws of the State of
        California, with a venue at the UC San Diego Theater District in La Jolla, California.
      </p>

      <h2>2. What the Site is</h2>
      <p>
        The Site is an informational website about the STATION8 Public Market food hall and the
        vendors that operate within it. It provides information about our space, our vendors,
        events, hours, location, and ways to contact us. The Site does not currently process
        transactions.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to use the Site to:</p>
      <ul>
        <li>Violate any law or regulation, or anyone else&rsquo;s rights.</li>
        <li>
          Attempt to interfere with the Site&rsquo;s operation, including by introducing malware,
          attempting unauthorized access, scraping at scale, or probing for vulnerabilities outside
          a coordinated disclosure (see <a href="/.well-known/security.txt">security.txt</a>).
        </li>
        <li>
          Misrepresent your identity, impersonate another person, or harass anyone via the contact
          channels we provide.
        </li>
        <li>
          Submit content you don&rsquo;t have the right to share, or that is unlawful, defamatory,
          discriminatory, or harmful.
        </li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>
        The Site&rsquo;s name, logos, trade dress, design, photography, copy, and brand assets are
        owned by STATION8 or its licensors and are protected by intellectual property laws.
        Individual vendor names and marks are the property of their respective owners and appear on
        the Site by permission.
      </p>
      <p>
        You may view, download, and print pages from the Site for your own non-commercial, personal,
        informational use. Any other use — including reproduction, distribution, modification, or
        republication — requires our prior written permission.
      </p>

      <h2>5. Third-party links and services</h2>
      <p>
        The Site may link to third-party websites and services (for example, vendor websites or map
        services). We do not control, and are not responsible for, those third parties or their
        content. Your use of any third-party site or service is governed by its own terms and
        privacy policy.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The Site is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
        <strong>&ldquo;as available.&rdquo;</strong> To the fullest extent permitted by law, we
        disclaim all warranties, express or implied, including warranties of merchantability,
        fitness for a particular purpose, and non-infringement. We do not warrant that the Site will
        be uninterrupted, error-free, secure, or that the information on it is accurate or current
        at every moment. Vendor lineups, hours, events, and menus may change without notice; please
        confirm anything time-sensitive directly with us before relying on it.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, neither STATION8 nor its officers, directors,
        employees, agents, or licensors will be liable for any indirect, incidental, special,
        consequential, exemplary, or punitive damages arising out of or related to your use of the
        Site. Our total aggregate liability for any claim arising out of or related to the Site will
        not exceed one hundred U.S. dollars (US $100).
      </p>
      <p>
        Some jurisdictions do not allow the exclusion or limitation of certain damages. In those
        jurisdictions, the limitations above apply to the maximum extent permitted by law.
      </p>

      <h2>8. Indemnity</h2>
      <p>
        You agree to indemnify and hold STATION8 harmless from any claim, demand, or damages
        (including reasonable attorneys&rsquo; fees) arising out of your breach of these Terms or
        your misuse of the Site.
      </p>

      <h2>9. Governing law and venue</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to its
        conflict-of-laws rules. Any dispute arising out of or relating to these Terms or the Site
        will be resolved exclusively in the state or federal courts located in San Diego County,
        California, and you consent to personal jurisdiction there.
      </p>

      <h2>10. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;last updated&rdquo; date at the top
        of this page reflects the most recent change. Continued use of the Site after a change
        constitutes acceptance of the updated Terms.
      </p>

      <h2>11. Severability and entire agreement</h2>
      <p>
        If any provision of these Terms is held invalid or unenforceable, the rest will remain in
        effect. These Terms, together with the <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/cookies">Cookie &amp; Storage Policy</a>, are the entire agreement between you and
        STATION8 regarding the Site.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these Terms? Email <strong>legal@[domain]</strong> or write to us at:
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

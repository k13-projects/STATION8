import type { Metadata } from "next";
import { LegalShell } from "../_legal/LegalShell";

export const metadata: Metadata = {
  title: "Cookie & Storage Policy",
  description: "What STATION8 stores in your browser, why, and how to clear it.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 26, 2026";

export default function CookiePolicyPage() {
  return (
    <LegalShell title="Cookie & Storage Policy" eyebrow="Legal" lastUpdated={LAST_UPDATED}>
      <p className="legal-lede">
        This page explains what STATION8 Public Market stores in your browser when you visit this
        website, why we store it, and how to remove it. We&rsquo;ve kept this short on purpose
        because the answer is short: we use almost nothing.
      </p>

      <h2>1. Cookies</h2>
      <p>
        <strong>This website does not currently set any cookies.</strong> No first-party cookies, no
        third-party cookies, no analytics or advertising cookies. If that changes in the future, we
        will update this page before any new cookies are set, and where required by law we will ask
        for your consent first.
      </p>

      <h2>2. Local storage (browser-side preferences)</h2>
      <p>
        We save a single value in your browser&rsquo;s <em>localStorage</em> to remember your choice
        for on-page motion. The technical details:
      </p>
      <table className="legal-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Purpose</th>
            <th>Lifetime</th>
            <th>Sent to a server?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>station8.motion-toggle</code>
            </td>
            <td>
              Remembers whether you prefer animations to follow your operating-system setting,
              always be reduced, or always be full.
            </td>
            <td>Until you clear your browser storage. The site does not set an expiry.</td>
            <td>No — it stays on your device.</td>
          </tr>
        </tbody>
      </table>
      <p>
        This entry is functional. It exists so that a deliberate accessibility choice you make in
        the footer is honored on your next visit. Removing it has no effect other than resetting
        that preference to &ldquo;follow system.&rdquo;
      </p>

      <h2>3. How to clear browser storage</h2>
      <p>
        Every modern browser lets you clear cookies and site data. The exact menu varies, but the
        general path is:
      </p>
      <ul>
        <li>
          <strong>Chrome / Edge:</strong> Settings → Privacy and security → Cookies and other site
          data → See all site data → search for our domain → Delete.
        </li>
        <li>
          <strong>Safari:</strong> Settings → Privacy → Manage Website Data → search for our domain
          → Remove.
        </li>
        <li>
          <strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data →
          Manage Data.
        </li>
      </ul>

      <h2>4. Third-party services</h2>
      <p>
        At present, no third parties set cookies or storage through this site. When we add features
        such as embedded maps (Mapbox), an Instagram feed, or a booking form with bot protection,
        those services may set their own storage. We will update this page before turning any of
        them on, and we will list each one and what it stores.
      </p>

      <h2>5. Do Not Track and Global Privacy Control</h2>
      <p>
        Because we do not track you, we do not need to honor or ignore Do Not Track or Global
        Privacy Control signals — there is nothing to opt out of. If we ever introduce tracking,
        this section will explain how those signals are handled.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about anything on this page? Email <strong>privacy@[domain]</strong>.
      </p>

      <p className="legal-disclaimer">
        <em>
          This document is a working draft pending review by qualified legal counsel. Terms in
          square brackets must be filled in before publication.
        </em>
      </p>
    </LegalShell>
  );
}

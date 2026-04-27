import type { Metadata } from "next";
import { LegalShell } from "../_legal/LegalShell";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "STATION8 Public Market's commitment to digital accessibility, the standards we follow, and how to report a barrier.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 26, 2026";

export default function AccessibilityPage() {
  return (
    <LegalShell title="Accessibility Statement" eyebrow="Accessibility" lastUpdated={LAST_UPDATED}>
      <p className="legal-lede">
        STATION8 Public Market is committed to making this website usable by everyone, including
        people who use assistive technologies. Accessibility is treated as a feature, not a
        compliance checkbox. This statement describes the standards we follow, what we do to meet
        them, what is still in progress, and how to reach us if you encounter a barrier.
      </p>

      <h2>1. Standards we conform to</h2>
      <p>We design and build this website to substantially conform to:</p>
      <ul>
        <li>
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong> — published by
          the W3C.
        </li>
        <li>
          <strong>Section 508 of the U.S. Rehabilitation Act</strong> (the 2017 refresh, which
          incorporates WCAG 2.0 AA by reference and is widely understood to align with WCAG 2.1 AA).
        </li>
        <li>
          <strong>Title III of the Americans with Disabilities Act (ADA)</strong> as it applies to
          places of public accommodation.
        </li>
      </ul>

      <h2>2. What we do</h2>
      <ul>
        <li>
          <strong>Semantic HTML and landmarks.</strong> Every page uses a clear heading hierarchy,
          landmark regions (<code>header</code>, <code>nav</code>, <code>main</code>,{" "}
          <code>footer</code>), and ARIA only where native semantics fall short.
        </li>
        <li>
          <strong>Keyboard support.</strong> All interactive elements can be reached and operated
          using the keyboard, with a visible focus indicator on every control. A &ldquo;skip to
          content&rdquo; link is the first focusable element on every page.
        </li>
        <li>
          <strong>Reduced motion.</strong> The site respects the operating system&rsquo;s{" "}
          <code>prefers-reduced-motion</code> setting and additionally provides a manual motion
          toggle in the footer with three states: follow system, reduced, or full.
        </li>
        <li>
          <strong>Image alternatives.</strong> Meaningful images have descriptive alt text;
          decorative images are explicitly hidden from assistive technologies.
        </li>
        <li>
          <strong>Color and contrast.</strong> Body text and interactive elements meet or exceed
          WCAG AA contrast ratios. The brand palette has been audited against text-on-background
          combinations actually used in the layout.
        </li>
        <li>
          <strong>Zoom and text scaling.</strong> The site supports browser zoom up to 200% (and
          beyond) without loss of content or function. We do not cap maximum zoom in the viewport.
        </li>
        <li>
          <strong>Native dialog semantics.</strong> Modal dialogs use the platform&rsquo;s native{" "}
          <code>&lt;dialog&gt;</code> element, which gives focus trapping, background inertness, and
          escape-to-close for free.
        </li>
        <li>
          <strong>Automated testing.</strong> Every change is checked against{" "}
          <a href="https://github.com/dequelabs/axe-core" rel="noopener">
            axe-core
          </a>{" "}
          (WCAG 2A &amp; 2AA rules) in our continuous integration pipeline before it is allowed to
          merge.
        </li>
      </ul>

      <h2>3. Known limitations</h2>
      <p>
        We aim for full conformance, but we are honest about known gaps so you can plan around them.
        As of the date above:
      </p>
      <ul>
        <li>
          The decorative full-bleed photographic dividers between sections are presented as visually
          rich content; they carry brief alt text but are primarily atmospheric. If they are
          confusing in your reader, please tell us.
        </li>
        <li>
          Some entrance animations rely on motion. They are automatically disabled when reduced
          motion is requested, but if any escape that net, please report them.
        </li>
        <li>
          The booking and contact flows currently route to email links. When we launch a hosted
          form, it will include explicit field labels, inline error messaging, and full keyboard and
          screen-reader support, and this statement will be updated.
        </li>
      </ul>

      <h2>4. Compatibility</h2>
      <p>
        This website is designed to work with the latest versions of the following assistive
        technologies and browsers:
      </p>
      <ul>
        <li>VoiceOver on macOS / iOS (Safari, Chrome).</li>
        <li>NVDA and JAWS on Windows (Edge, Chrome, Firefox).</li>
        <li>TalkBack on Android (Chrome).</li>
      </ul>
      <p>
        Older browsers, browsers without modern CSS support, or very old screen readers may have a
        degraded — but still usable — experience.
      </p>

      <h2>5. How to report a barrier</h2>
      <p>
        If you encounter anything on this site that is hard to use with an assistive technology, or
        any content you can&rsquo;t access, please tell us. We treat these reports as bugs and
        prioritize them accordingly. Please include:
      </p>
      <ul>
        <li>The page URL.</li>
        <li>What you were trying to do.</li>
        <li>The assistive technology and browser you were using.</li>
        <li>What happened, and what you expected to happen.</li>
      </ul>
      <p>
        Send reports to <strong>accessibility@[domain]</strong>. We aim to respond within five
        business days and to resolve confirmed barriers as quickly as the change permits.
      </p>

      <h2>6. Formal complaints</h2>
      <p>
        If you are not satisfied with our response and believe you have been discriminated against
        on the basis of disability, you may file a complaint with the U.S. Department of Justice
        Civil Rights Division at{" "}
        <a href="https://www.ada.gov" rel="noopener">
          ada.gov
        </a>
        . Nothing on this page limits any other right or remedy you may have under applicable law.
      </p>

      <h2>7. Date and review</h2>
      <p>
        This statement was last reviewed on <strong>{LAST_UPDATED}</strong>. We re-review it at
        least once per year and after any significant change to the site.
      </p>

      <p className="legal-disclaimer">
        <em>
          This statement reflects the configuration of the site as of the date above. If you are
          reading a printed or cached version, the live version at <code>/accessibility</code> on
          this site is authoritative.
        </em>
      </p>
    </LegalShell>
  );
}

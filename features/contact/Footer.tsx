import Link from "next/link";
import { PSMBadgeAnimated } from "@/design-system/icons/PSMBadgeAnimated";
import { Body, H1, MonoCaption, MonoLabel } from "@/design-system/primitives/Typography";
import { MotionToggle } from "./MotionToggle";

/**
 * Footer / CONTACT US — the final section from the brief.
 * Olive background with a big PSM badge on the left,
 * LET'S CONNECT heading and inquiry links on the right.
 */

const INQUIRIES = [
  { label: "General inquiries", href: "mailto:hello@station8.example" },
  { label: "Vendor opportunities", href: "mailto:vendors@station8.example" },
  { label: "Careers", href: "mailto:careers@station8.example" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      data-section-bg="--color-olive"
      className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
    >
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:gap-24 md:px-12 md:py-28">
        <div className="flex items-center justify-center md:justify-end">
          <PSMBadgeAnimated size={240} delay={0.1} />
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-6">
            <span
              aria-hidden="true"
              className="h-px w-14 bg-[color:var(--color-sand-stone)]/55 md:w-20"
            />
            <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-mono-label)] uppercase tracking-[0.22em] whitespace-nowrap text-[color:var(--color-sand-stone)] md:text-base">
              Contact Us
            </span>
          </div>
          <H1
            as="h2"
            className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] md:text-[length:var(--text-display-md)] uppercase tracking-tight"
          >
            Let's Connect
          </H1>
          <Body className="max-w-[44ch] text-[color:var(--color-sand-stone)]/80">
            Big ideas, bold flavors, and good conversations start here. Reach out — we'd love to
            hear from you.
          </Body>
          <ul className="space-y-3">
            {INQUIRIES.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="group inline-flex items-baseline gap-3 text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
                >
                  <MonoLabel className="font-[family-name:var(--font-sans)] text-[length:var(--text-h3)] font-semibold">
                    {i.label}
                  </MonoLabel>
                  <span
                    aria-hidden="true"
                    className="translate-x-0 group-hover:translate-x-1 transition-transform duration-[var(--duration-fast)]"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link
              href="https://instagram.com/station8"
              aria-label="STATION8 on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-sand-stone)]/80 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[color:var(--color-sand-stone)]/25">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12">
          <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
            © {new Date().getFullYear()} STATION8 Public Market
          </MonoCaption>
          <div className="flex flex-wrap items-center gap-6">
            <MotionToggle />
            <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
              Designed with care in La Jolla
            </MonoCaption>
          </div>
        </div>
      </div>
    </footer>
  );
}

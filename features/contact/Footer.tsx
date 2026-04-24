import Link from "next/link";
import { PSMBadge } from "@/design-system/icons/PSMBadge";
import { PatternOverlay } from "@/design-system/primitives/PatternOverlay";
import { Body, H3, MonoCaption, MonoLabel } from "@/design-system/primitives/Typography";

/**
 * Site footer / Contact section.
 * Real content (emails, IG handle) arrives in P4. This shell is a reviewable
 * visual end-state so Lorena can sign off on hierarchy and spacing.
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
      className="relative overflow-hidden bg-[color:var(--color-dark-bark)] text-[color:var(--color-sand-stone)]"
    >
      <div className="text-[color:var(--color-sand-stone)]">
        <PatternOverlay opacity={0.06} />
      </div>
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr_1fr] md:px-12 md:py-28">
        <div className="space-y-6">
          <PSMBadge size={72} />
          <H3 className="max-w-[18ch]">Let's Connect.</H3>
          <Body className="max-w-[38ch] text-[color:var(--color-sand-stone)]/75">
            Big ideas, bold flavors, and good conversations start here. Reach out — we'd love to
            hear from you.
          </Body>
        </div>

        <div className="space-y-5">
          <MonoCaption className="text-[color:var(--color-sand-stone)]/60">Inquiries</MonoCaption>
          <ul className="space-y-3">
            {INQUIRIES.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="group inline-flex items-baseline gap-2 text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
                >
                  <MonoLabel className="w-40">{i.label}</MonoLabel>
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
        </div>

        <div className="space-y-5">
          <MonoCaption className="text-[color:var(--color-sand-stone)]/60">
            Visit · Follow
          </MonoCaption>
          <address className="not-italic space-y-2">
            <MonoLabel as="p">La Jolla, CA 92037</MonoLabel>
            <MonoLabel as="p" className="text-[color:var(--color-sand-stone)]/70">
              Daily · 7 AM – 9 PM
            </MonoLabel>
          </address>
          <Link
            href="https://instagram.com/station8"
            className="inline-flex items-baseline gap-2 mono-caption text-[color:var(--color-sand-stone)] hover:text-white"
          >
            <span>Instagram</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <div className="relative border-t border-[color:var(--color-sand-stone)]/20">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12">
          <MonoCaption className="text-[color:var(--color-sand-stone)]/60">
            © {new Date().getFullYear()} Station 8 Public Market · Landmark Food Halls
          </MonoCaption>
          <MonoCaption className="text-[color:var(--color-sand-stone)]/60">
            Designed with care in La Jolla
          </MonoCaption>
        </div>
      </div>
    </footer>
  );
}

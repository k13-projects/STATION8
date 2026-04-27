import Link from "next/link";
import type { ReactNode } from "react";
import { Body, DisplayLG, MonoCaption } from "@/design-system/primitives/Typography";
import { Footer } from "@/features/contact/Footer";
import { Nav } from "@/features/nav/Nav";

/**
 * Shared shell for /privacy, /terms, /cookies, /accessibility.
 * Single column, generous measure, neutral Sand Stone background. The legal
 * pages share enough structure (eyebrow + title + last-updated + long-form
 * body + footer) that one shell is cheaper than four near-duplicates.
 *
 * Article-level styling for headings, lists, tables, code lives in
 * `app/globals.css` under `.legal-prose` so the page files stay copy-only.
 */

type Props = {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalShell({ title, eyebrow, lastUpdated, children }: Props) {
  return (
    <>
      <Nav />

      <main id="main-content">
        <article
          data-section-bg="--color-sand-stone"
          className="relative min-h-[60svh] bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto max-w-[68ch] px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
            <header className="mb-10 md:mb-14">
              <MonoCaption className="text-[color:var(--color-olive)]">{eyebrow}</MonoCaption>
              <DisplayLG
                as="h1"
                className="mt-3 font-[family-name:var(--font-display)] uppercase tracking-tight"
              >
                {title}
              </DisplayLG>
              <Body className="mt-4 text-[color:var(--color-dark-bark)]/65">
                Last updated: {lastUpdated}
              </Body>
              <nav aria-label="Legal pages" className="mt-6 text-sm">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[color:var(--color-dark-bark)]/70">
                  <li>
                    <Link className="underline-offset-4 hover:underline" href="/privacy">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link className="underline-offset-4 hover:underline" href="/terms">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link className="underline-offset-4 hover:underline" href="/cookies">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link className="underline-offset-4 hover:underline" href="/accessibility">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>

            <div className="legal-prose">{children}</div>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/design-system/primitives/Button";
import { Body, DisplayLG, MonoCaption } from "@/design-system/primitives/Typography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      data-section-bg="--color-dark-bark"
      className="relative flex min-h-svh flex-col items-center justify-center bg-[color:var(--color-dark-bark)] px-6 py-24 text-center text-[color:var(--color-sand-stone)]"
    >
      <MonoCaption className="text-[color:var(--color-sand-stone)]/70">Error · 404</MonoCaption>
      <DisplayLG
        as="h1"
        className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] uppercase tracking-tight"
      >
        Page not found
      </DisplayLG>
      <Body className="mt-6 max-w-[44ch] text-[color:var(--color-sand-stone)]/80">
        The page you&rsquo;re looking for has moved, was renamed, or never existed. Let&rsquo;s get
        you back to the market.
      </Body>
      <div className="mt-10">
        <Button
          href="/"
          variant="primary"
          className="!rounded-full !bg-[color:var(--color-sand-stone)] !text-[color:var(--color-dark-bark)] !border-[color:var(--color-sand-stone)] hover:!bg-white"
        >
          Back to home
        </Button>
      </div>
      <nav aria-label="Site sections" className="mt-12 text-sm">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[color:var(--color-sand-stone)]/70">
          <li>
            <Link className="underline-offset-4 hover:underline" href="/#vendors">
              Vendors
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/#events">
              Events
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/#bookings">
              Bookings
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/#visit-us">
              Visit Us
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

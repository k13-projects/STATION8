"use client";

/**
 * Branded crash fallback. Next.js 15 requires error boundaries in App Router
 * to be client components — don't try to make this a server component.
 *
 * `reset()` re-renders the route segment tree. We don't log to a third-party
 * monitoring service yet (see DECISIONS_NEEDED.md D-5); when Sentry lands,
 * call `Sentry.captureException(error)` here.
 */

import { useEffect } from "react";
import { Button } from "@/design-system/primitives/Button";
import { Body, DisplayLG, MonoCaption } from "@/design-system/primitives/Typography";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in dev console; replace with Sentry once wired.
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main
      id="main-content"
      data-section-bg="--color-dark-bark"
      className="relative flex min-h-svh flex-col items-center justify-center bg-[color:var(--color-dark-bark)] px-6 py-24 text-center text-[color:var(--color-sand-stone)]"
    >
      <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
        Something went wrong
      </MonoCaption>
      <DisplayLG
        as="h1"
        className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] uppercase tracking-tight"
      >
        We hit a snag
      </DisplayLG>
      <Body className="mt-6 max-w-[44ch] text-[color:var(--color-sand-stone)]/80">
        Our apologies — an unexpected error stopped this page from loading. You can try again, or
        head back to the home page.
      </Body>
      {error.digest ? (
        <MonoCaption className="mt-6 text-[color:var(--color-sand-stone)]/55">
          Reference: {error.digest}
        </MonoCaption>
      ) : null}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button
          onClick={() => reset()}
          variant="primary"
          className="!rounded-full !bg-[color:var(--color-sand-stone)] !text-[color:var(--color-dark-bark)] !border-[color:var(--color-sand-stone)] hover:!bg-white"
        >
          Try again
        </Button>
        <Button
          href="/"
          variant="secondary"
          className="!rounded-full !border-[color:var(--color-sand-stone)] !text-[color:var(--color-sand-stone)] hover:!bg-[color:var(--color-sand-stone)]/10"
        >
          Back to home
        </Button>
      </div>
    </main>
  );
}

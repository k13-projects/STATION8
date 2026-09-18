import { MonoCaption } from "@/design-system/primitives/Typography";

/**
 * EventDateCard — the white rounded-rectangle card from the brief's Events row.
 * Month label stacked above the date number inside a small dark tab on the
 * top-left. Events come from the client's Google Sheet; see lib/events.ts.
 */

type Props = {
  month: string;
  day: number;
  title?: string;
  /**
   * A finished event keeps its place for a while so a visitor can see what
   * they missed (Kazim, 2026-09-18). It is dimmed and desaturated, and it
   * carries the word "Past": colour alone is not a label, and a card that is
   * only slightly greyer reads as a rendering bug rather than a deliberate
   * state, to a passing eye and to a screen reader alike.
   */
  past?: boolean;
};

export function EventDateCard({ month, day, title, past = false }: Props) {
  return (
    <article
      className={`relative flex min-h-[140px] w-full overflow-hidden rounded-[32px] bg-white text-[color:var(--color-dark-bark)] shadow-[0_6px_18px_rgba(0,0,0,0.18)] ${
        past ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* Dark date tab on the top-left */}
      <div className="flex min-w-[96px] flex-col items-center justify-center gap-1 bg-[color:var(--color-dark-bark)] p-4 text-[color:var(--color-sand-stone)]">
        <MonoCaption className="text-[color:var(--color-sand-stone)]/80">{month}</MonoCaption>
        <span className="font-[family-name:var(--font-display)] text-5xl leading-none">{day}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-4">
        {past ? (
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-dark-bark)]/55">
            Past
          </span>
        ) : null}
        {title ? (
          <span className="font-[family-name:var(--font-sans)] text-base font-medium text-[color:var(--color-dark-bark)]">
            {title}
          </span>
        ) : null}
      </div>
    </article>
  );
}

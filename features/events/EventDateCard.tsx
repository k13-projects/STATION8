import { MonoCaption } from "@/design-system/primitives/Typography";

/**
 * EventDateCard — the white rounded-rectangle card from the brief's Events row.
 * Month label stacked above the date number inside a small dark tab on the
 * top-left, with the rest of the card ready to receive an event title (when
 * data is wired up in P4 via Sanity).
 */

type Props = {
  month: string;
  day: number;
  title?: string;
};

export function EventDateCard({ month, day, title }: Props) {
  return (
    <article className="relative flex min-h-[140px] w-full overflow-hidden rounded-[32px] bg-white text-[color:var(--color-dark-bark)] shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
      {/* Dark date tab on the top-left */}
      <div className="flex min-w-[96px] flex-col items-center justify-center gap-1 bg-[color:var(--color-dark-bark)] p-4 text-[color:var(--color-sand-stone)]">
        <MonoCaption className="text-[color:var(--color-sand-stone)]/80">{month}</MonoCaption>
        <span className="font-[family-name:var(--font-display)] text-5xl leading-none">{day}</span>
      </div>
      <div className="flex flex-1 items-center px-6 py-4">
        {title ? (
          <span className="font-[family-name:var(--font-sans)] text-base font-medium text-[color:var(--color-dark-bark)]">
            {title}
          </span>
        ) : null}
      </div>
    </article>
  );
}

import type { ReactNode } from "react";

/**
 * ArchCard — the signature card shape used by vendors, instagram tiles, and
 * anywhere the site wants to feel like a gallery frame. Semicircular top,
 * square bottom, set into a 3/4 portrait aspect. Pass a `photo` slot for a
 * cover image and a `meta` slot for the mono-label caption below.
 *
 * The `tone` prop swaps the card into `paper` (Sand Stone on Olive) or
 * `inverse` (Dark Bark on Sand Stone) for mixed grids.
 */

type ArchCardProps = {
  children?: ReactNode;
  photo?: ReactNode;
  meta?: ReactNode;
  tone?: "paper" | "inverse";
  className?: string;
  interactive?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ArchCard({
  children,
  photo,
  meta,
  tone = "paper",
  className,
  interactive = false,
}: ArchCardProps) {
  const toneClasses =
    tone === "paper"
      ? "bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)] border-[color:var(--color-dark-bark)]/15"
      : "bg-[color:var(--color-dark-bark)] text-[color:var(--color-sand-stone)] border-[color:var(--color-sand-stone)]/25";

  return (
    <article
      className={cx(
        "group relative flex flex-col overflow-hidden border",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)]",
        interactive && "hover:-translate-y-1",
        toneClasses,
        className,
      )}
      style={{ borderRadius: "9999px 9999px 0 0" }}
    >
      {photo && (
        <div
          className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-spice)]/20"
          style={{ borderRadius: "9999px 9999px 0 0" }}
        >
          {photo}
        </div>
      )}
      {children && <div className="flex flex-col gap-2 p-4">{children}</div>}
      {meta && <div className="mt-auto border-t border-current/10 px-4 py-3">{meta}</div>}
    </article>
  );
}

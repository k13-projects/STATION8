/**
 * SectionLabel — the eyebrow-between-rules motif from the STATION8 brief.
 * Centered label with a hairline rule running the full available width on
 * either side. Label sits at a genuine reading size (not a micro caption),
 * so it carries weight against the big display headings and the arch cards.
 *
 * `tone="light"` for Olive/Dark sections, `tone="dark"` for Sand Stone / white.
 */

type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
};

export function SectionLabel({
  children,
  tone = "light",
  align = "center",
  className,
}: SectionLabelProps) {
  const labelColor =
    tone === "light"
      ? "text-[color:var(--color-sand-stone)]"
      : "text-[color:var(--color-dark-bark)]";
  const ruleColor =
    tone === "light"
      ? "bg-[color:var(--color-sand-stone)]/55"
      : "bg-[color:var(--color-dark-bark)]/35";

  return (
    <div
      className={`flex items-center gap-6 md:gap-10 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className ?? ""}`}
    >
      {align === "center" && <span aria-hidden="true" className={`h-px flex-1 ${ruleColor}`} />}
      <span
        className={`font-[family-name:var(--font-mono)] text-[length:var(--text-mono-label)] md:text-base uppercase tracking-[0.22em] whitespace-nowrap ${labelColor}`}
      >
        {children}
      </span>
      <span aria-hidden="true" className={`h-px flex-1 ${ruleColor}`} />
    </div>
  );
}

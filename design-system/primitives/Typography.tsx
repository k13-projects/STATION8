import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Typography primitives — one component per role.
 * Semantics (h1, h2, p, span) are separate from visual size so a page can
 * open with a display-xl heading semantically `h1`, or inline a mono caption
 * inside any parent without forcing an element type.
 *
 * Any extra HTML attribute (id, aria-*, data-*, style) is forwarded.
 */

type CommonProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ── Display — Industry Inc (display-xl) ── */
export function DisplayXL({ children, className, as: As = "h1", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-display)] leading-[0.9] tracking-[-0.02em]",
        "text-[length:var(--text-display-lg)] md:text-[length:var(--text-display-xl)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── Display — section headers (display-lg) ── */
export function DisplayLG({ children, className, as: As = "h2", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-display)] leading-[0.95] tracking-[-0.01em]",
        "text-[length:var(--text-display-md)] md:text-[length:var(--text-display-lg)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── H1 — modal / sub-page titles ── */
export function H1({ children, className, as: As = "h1", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-display)] leading-tight tracking-tight",
        "text-[length:var(--text-h1)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── H2 — card titles, vendor names ── */
export function H2({ children, className, as: As = "h3", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-sans)] font-bold leading-snug",
        "text-[length:var(--text-h2)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── H3 — sub-headers ── */
export function H3({ children, className, as: As = "h4", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-sans)] font-medium leading-snug",
        "text-[length:var(--text-h3)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── Body copy ── */
export function Body({ children, className, as: As = "p", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-sans)] leading-relaxed",
        "text-[length:var(--text-body)]",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── Mono label — form labels, metadata, addresses ── */
export function MonoLabel({ children, className, as: As = "span", ...rest }: CommonProps) {
  return (
    <As
      className={cx(
        "font-[family-name:var(--font-mono)]",
        "text-[length:var(--text-mono-label)] leading-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ── Mono caption — eyebrows, tags, uppercase +tracking ── */
export function MonoCaption({ children, className, as: As = "span", ...rest }: CommonProps) {
  return (
    <As className={cx("mono-caption", className)} {...rest}>
      {children}
    </As>
  );
}

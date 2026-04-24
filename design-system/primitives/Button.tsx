import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button / Link primitive.
 * Variants follow the brand system:
 *  - `primary`    — filled Sand Stone on Dark Bark, the one non-magnetic CTA.
 *  - `secondary`  — hairline outline, Sand Stone rule + ink.
 *  - `ghost`      — naked text with mono caption treatment (nav links, footer mailtos).
 *
 * Size `md` is 48px hit target (thumb-reachable); `sm` is 36px for inline use.
 * `href` renders an anchor (next/link); absence renders a <button>.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButton = BaseProps & ComponentProps<"button"> & { href?: undefined };
type AsAnchor = BaseProps & ComponentProps<typeof Link> & { href: string };
type ButtonProps = AsButton | AsAnchor;

const BASE =
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-mono)] uppercase tracking-[0.14em] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-[color:var(--color-sand-stone)]";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)] hover:bg-[color:var(--color-may)] rounded-[2px] border border-[color:var(--color-sand-stone)]",
  secondary:
    "bg-transparent text-[color:var(--color-sand-stone)] hover:bg-[color:var(--color-sand-stone)]/10 border border-[color:var(--color-sand-stone)]/60 rounded-[2px]",
  ghost: "bg-transparent text-[color:var(--color-sand-stone)] hover:text-white",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-6 text-[length:var(--text-mono-label)]",
  sm: "h-9 px-4 text-[length:var(--text-mono-caption)]",
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const cls = cx(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AsAnchor;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as AsButton;
  return (
    <button type={type} className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

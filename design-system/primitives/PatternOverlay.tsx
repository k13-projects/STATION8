/**
 * PatternOverlay — the STATION8 ruler-grid pattern as pure CSS.
 *
 * Recreated from `ASSETS/PATTERNS/STATION8 GEOMETRIC PATTERN WHITE 2.png` as a
 * CSS background so it scales infinitely, tints to any currentColor, and has
 * zero byte cost. The PNG remains in public/brand/ as a fallback if pixel
 * fidelity is ever required.
 *
 * Use absolutely-positioned inside a relative parent. The pattern inherits
 * `color` — set it on the parent (e.g. via Tailwind `text-[color:var(--color-sand-stone)]/10`).
 */

type PatternOverlayProps = {
  opacity?: number;
  cell?: number; // grid cell size in px (default 48)
  tick?: number; // tick length at each intersection (default 8)
  className?: string;
};

export function PatternOverlay({
  opacity = 0.08,
  cell = 48,
  tick = 8,
  className,
}: PatternOverlayProps) {
  const style = {
    opacity,
    "--cell": `${cell}px`,
    "--tick": `${tick}px`,
    backgroundImage: `
      /* horizontal ticks at each intersection */
      linear-gradient(
        to right,
        currentColor 0,
        currentColor var(--tick),
        transparent var(--tick)
      ),
      /* vertical ticks at each intersection */
      linear-gradient(
        to bottom,
        currentColor 0,
        currentColor var(--tick),
        transparent var(--tick)
      ),
      /* faint full horizontal rule at each row */
      linear-gradient(to bottom, transparent calc(100% - 1px), currentColor 100%),
      /* faint full vertical rule at each column */
      linear-gradient(to right, transparent calc(100% - 1px), currentColor 100%)
    `,
    backgroundSize: `
      var(--cell) var(--cell),
      var(--cell) var(--cell),
      var(--cell) var(--cell),
      var(--cell) var(--cell)
    `,
    backgroundPosition: "0 0, 0 0, 0 0, 0 0",
  } as React.CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none mix-blend-overlay ${className ?? ""}`}
      style={style}
    />
  );
}

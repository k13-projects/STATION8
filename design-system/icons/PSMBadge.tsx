/**
 * PSM Badge — STATION8 Public Market brand mark
 *
 * Approximated from the master PNG (ASSETS/LOGOS/STATION8 BADGE.png) pending
 * a vector SVG source from Lorena. Core brand geometry preserved:
 * outer + inner circles, north/south/east/west crosshair, P and M flanking
 * the equator, an S monogram at the center.
 *
 * The SVG uses `currentColor` so the badge inherits the parent's text color.
 * Set `data-draw` on a parent or wire `useDrawIn` (see motion/primitives) to
 * drive the stroke-draw entrance; path lengths are already `pathLength="1"`
 * so dash animations are trivial.
 */

type PSMBadgeProps = {
  size?: number | string;
  className?: string;
  title?: string;
  /** Stops screen readers from announcing decorative instances. */
  decorative?: boolean;
};

export function PSMBadge({
  size = 64,
  className,
  title = "Station 8 Public Market",
  decorative = false,
}: PSMBadgeProps) {
  const a11y = decorative
    ? { "aria-hidden": true as const, role: "presentation" }
    : { role: "img" as const, "aria-label": title };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      <title>{title}</title>

      {/* Outer frame circle */}
      <circle cx="100" cy="100" r="94" pathLength="1" />

      {/* Inner dial circle */}
      <circle cx="100" cy="100" r="86" strokeWidth={0.9} pathLength="1" />

      {/* Crosshair — N/S/E/W tick rails */}
      <line x1="6" y1="100" x2="42" y2="100" pathLength="1" />
      <line x1="158" y1="100" x2="194" y2="100" pathLength="1" />
      <line x1="100" y1="6" x2="100" y2="42" pathLength="1" />
      <line x1="100" y1="158" x2="100" y2="194" pathLength="1" />

      {/* P on the west arm */}
      <g strokeWidth={0.9} fontFamily="var(--font-mono)">
        <text
          x="26"
          y="103"
          fontSize="11"
          fill="currentColor"
          stroke="none"
          textAnchor="middle"
          fontWeight={700}
        >
          P
        </text>
        <text
          x="174"
          y="103"
          fontSize="11"
          fill="currentColor"
          stroke="none"
          textAnchor="middle"
          fontWeight={700}
        >
          M
        </text>
      </g>

      {/* Central S monogram — three concentric rounded strokes */}
      <g strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        {/* Top lobe opens right */}
        <path
          d="M 128 66 C 128 54 118 46 106 46 L 78 46 C 66 46 58 54 58 66 C 58 78 66 86 78 86 L 122 86 C 134 86 142 94 142 106 C 142 118 134 126 122 126 L 78 126"
          pathLength="1"
        />
        {/* Inner S echo */}
        <path d="M 122 76 L 82 76 M 118 116 L 94 116" strokeWidth={2.2} pathLength="1" />
        {/* Bottom lobe */}
        <path
          d="M 72 134 C 72 146 82 154 94 154 L 122 154 C 134 154 142 146 142 134"
          pathLength="1"
        />
      </g>
    </svg>
  );
}

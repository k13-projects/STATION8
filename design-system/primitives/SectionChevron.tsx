/**
 * SectionChevron — the arrow-shaped section transition from the brief.
 *
 * Place at the bottom of a section to extend a triangular "flag" down into
 * the next section. The chevron inherits the `tone` background so it always
 * reads as the upper section poking into the lower one.
 *
 * Positioning: absolute-bottom, centered, nudged one pixel below the edge
 * so there is no anti-aliasing seam between the triangle and its parent.
 *
 * The parent <section> must be `position: relative` (most of ours already are).
 */

type SectionChevronProps = {
  /** Which brand color the chevron is painted — should match the section above it. */
  tone: "sand-stone" | "olive" | "dark-bark" | "white";
  /** Size preset — overridden by `width`/`height` props. */
  size?: "sm" | "md" | "lg";
  width?: number;
  height?: number;
  className?: string;
};

const SIZE_MAP: Record<NonNullable<SectionChevronProps["size"]>, { w: number; h: number }> = {
  sm: { w: 100, h: 28 },
  md: { w: 140, h: 44 },
  lg: { w: 180, h: 58 },
};

const TONE_TO_VAR: Record<SectionChevronProps["tone"], string> = {
  "sand-stone": "var(--color-sand-stone)",
  olive: "var(--color-olive)",
  "dark-bark": "var(--color-dark-bark)",
  white: "#ffffff",
};

export function SectionChevron({
  tone,
  size = "md",
  width,
  height,
  className,
}: SectionChevronProps) {
  const { w, h } = SIZE_MAP[size];
  const actualW = width ?? w;
  const actualH = height ?? h;
  const color = TONE_TO_VAR[tone];

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${actualW} ${actualH}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%-1px)] ${className ?? ""}`}
      style={{ width: actualW, height: actualH, zIndex: 2 }}
    >
      <polygon points={`0,0 ${actualW},0 ${actualW / 2},${actualH}`} fill={color} />
    </svg>
  );
}

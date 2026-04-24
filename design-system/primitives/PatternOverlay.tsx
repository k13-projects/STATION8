/**
 * PatternOverlay — the STATION8 circle-crosshair pattern (a tile of the PSM
 * badge) from the brand identity. Rendered as a tiled background-image so any
 * ancestor size gets covered, and masked to currentColor so dark-on-Olive or
 * light-on-Sand-Stone treatments compose cleanly.
 *
 * Source: public/brand/pattern-circles.png (extracted from the stakeholder's
 * brand pattern asset in ASSETS/PATTERNS/).
 */

type PatternOverlayProps = {
  opacity?: number;
  /** Tile size in px. The pattern artwork is ~800×240, scale down for density. */
  size?: number;
  className?: string;
};

export function PatternOverlay({ opacity = 0.18, size = 260, className }: PatternOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className ?? ""}`}
      style={{
        opacity,
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/pattern-circles.png)",
        maskImage: "url(/brand/pattern-circles.png)",
        WebkitMaskRepeat: "repeat",
        maskRepeat: "repeat",
        WebkitMaskSize: `${size}px auto`,
        maskSize: `${size}px auto`,
      }}
    />
  );
}

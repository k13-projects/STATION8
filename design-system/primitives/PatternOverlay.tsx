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
  /** Tile size in px. Ignored when `cover` is true. */
  size?: number;
  /** Start offset on each axis (e.g. "50% 50%" to begin mid-tile and repeat seamlessly). */
  position?: string;
  /** If true, scale one pattern instance to fill the entire overlay — no tile seams. */
  cover?: boolean;
  className?: string;
};

export function PatternOverlay({
  opacity = 0.18,
  size = 260,
  position = "0 0",
  cover = false,
  className,
}: PatternOverlayProps) {
  const maskSize = cover ? "cover" : `${size}px auto`;
  const maskRepeat = cover ? "no-repeat" : "repeat";

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{
        // Bleed past the section bounds so the PNG's transparent edge pixels
        // (and partial tiles at the section border) get cropped by the
        // parent's overflow-hidden instead of showing as unpatterned bands.
        inset: "-15%",
        opacity,
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/pattern-circles.png)",
        maskImage: "url(/brand/pattern-circles.png)",
        WebkitMaskRepeat: maskRepeat,
        maskRepeat: maskRepeat,
        WebkitMaskSize: maskSize,
        maskSize: maskSize,
        WebkitMaskPosition: position,
        maskPosition: position,
      }}
    />
  );
}

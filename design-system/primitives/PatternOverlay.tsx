/**
 * PatternOverlay — the STATION8 circle-crosshair pattern (a tile of the PSM
 * badge) from the brand identity. Rendered as a tiled background-image so any
 * ancestor size gets covered, and masked to currentColor so dark-on-Olive or
 * light-on-Sand-Stone treatments compose cleanly.
 *
 * Two asset modes:
 * - `cover` mode uses the decorative PNG master (varying circle scales) from
 *   public/brand/pattern-circles.png — scaled to fill once, no seams.
 * - Tile mode uses a seamless SVG unit cell from public/brand/pattern-tile.svg
 *   (corner dots are quartered across adjacent tiles, so repeats are invisible).
 */

type PatternOverlayProps = {
  opacity?: number;
  /** Tile size in px. Ignored when `cover` is true. */
  size?: number;
  /** Start offset on each axis (e.g. "50% 50%" to begin mid-tile and repeat seamlessly). */
  position?: string;
  /** If true, scale one pattern instance to fill the entire overlay — no tile seams. */
  cover?: boolean;
  /** Override the mask asset. Defaults to the decorative PNG (cover) or the seamless SVG (tile). */
  src?: string;
  className?: string;
};

export function PatternOverlay({
  opacity = 0.18,
  size = 260,
  position = "0 0",
  cover = false,
  src,
  className,
}: PatternOverlayProps) {
  const maskSize = cover ? "cover" : `${size}px ${size}px`;
  const maskRepeat = cover ? "no-repeat" : "repeat";
  const asset = src ?? (cover ? "/brand/pattern-circles.png" : "/brand/pattern-tile.svg");
  const maskUrl = `url(${asset})`;

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{
        // Bleed past the section bounds so the mask's transparent edge pixels
        // (and partial tiles at the section border) get cropped by the
        // parent's overflow-hidden instead of showing as unpatterned bands.
        inset: "-15%",
        opacity,
        backgroundColor: "currentColor",
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
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

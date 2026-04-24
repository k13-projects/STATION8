import Image from "next/image";

/**
 * STATION8 horizontal lockup — PSM badge stacked over the STATION8 wordmark
 * and PUBLIC MARKET subline.
 *
 * The master PNG is 2800 × 1817 (ratio 1.541). Pass either `height` or
 * `width` — the other dimension is derived from the intrinsic aspect ratio
 * so the lockup always keeps its proportions.
 *
 * Prefer sizing by `height` inside a fixed-height container (like a nav bar)
 * so the lockup can never overflow its parent.
 *
 * Use `tone="light"` on dark backgrounds, `tone="dark"` on light ones.
 */

const INTRINSIC_RATIO = 2800 / 1817;

type LockupProps = {
  tone?: "light" | "dark";
  /** Render at this pixel height; width is computed from the aspect ratio. */
  height?: number;
  /** Render at this pixel width; height is computed from the aspect ratio. */
  width?: number;
  className?: string;
  priority?: boolean;
};

export function Lockup({
  tone = "light",
  height,
  width,
  className,
  priority = false,
}: LockupProps) {
  const src = tone === "light" ? "/brand/station8-lockup-white.png" : "/brand/station8-lockup.png";

  // Resolve the missing dimension from the known aspect ratio.
  const renderHeight = height ?? (width ? Math.round(width / INTRINSIC_RATIO) : 80);
  const renderWidth = width ?? Math.round(renderHeight * INTRINSIC_RATIO);

  return (
    <Image
      src={src}
      alt="STATION8 Public Market"
      width={renderWidth * 2}
      height={renderHeight * 2}
      priority={priority}
      className={className}
      style={{ width: renderWidth, height: renderHeight }}
    />
  );
}

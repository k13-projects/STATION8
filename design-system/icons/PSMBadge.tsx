import Image from "next/image";

/**
 * PSM Badge — the real STATION8 brand mark from `ASSETS/LOGOS/`.
 * Uses the master PNG so the monogram renders exactly as Lorena drew it.
 * Tone: `light` pulls the white version for dark backgrounds, `dark` pulls
 * the black version for light backgrounds.
 *
 * Use `PSMBadgeAnimated` when you want the compass-lock entrance on mount.
 */

type PSMBadgeProps = {
  size?: number;
  className?: string;
  title?: string;
  tone?: "light" | "dark";
  decorative?: boolean;
};

export function PSMBadge({
  size = 64,
  className,
  title = "STATION8 Public Market",
  tone = "light",
  decorative = false,
}: PSMBadgeProps) {
  const src = tone === "light" ? "/brand/psm-badge-white.png" : "/brand/psm-badge.png";
  return (
    <Image
      src={src}
      alt={decorative ? "" : title}
      width={size * 2}
      height={size * 2}
      aria-hidden={decorative ? true : undefined}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

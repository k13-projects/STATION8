import Image from "next/image";

/**
 * STATION8 horizontal lockup — badge above the stencil wordmark.
 * Uses the master PNG until the source vector file is provided by Lorena.
 * Pass `tone="light"` on dark backgrounds, `tone="dark"` on light ones.
 */
type LockupProps = {
  tone?: "light" | "dark";
  width?: number;
  className?: string;
  priority?: boolean;
};

export function Lockup({ tone = "light", width = 240, className, priority = false }: LockupProps) {
  const src = tone === "light" ? "/brand/station8-lockup-white.png" : "/brand/station8-lockup.png";
  const height = Math.round(width * (2 / 3));

  return (
    <Image
      src={src}
      alt="Station 8 Public Market"
      width={width * 2}
      height={height * 2}
      priority={priority}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}

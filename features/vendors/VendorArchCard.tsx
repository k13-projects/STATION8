import Image from "next/image";
import { PSMBadgeCoinFlip } from "@/design-system/icons/PSMBadgeCoinFlip";
import { MonoCaption } from "@/design-system/primitives/Typography";
import { VendorLearnMoreModal } from "./VendorLearnMoreModal";
import type { Vendor } from "./vendors";

/**
 * VendorArchCard — one tile in the 3×3 Our Vendors grid.
 *
 * Full-color photo when the vendor has one; otherwise an "ARRIVING SOON"
 * card on solid Olive with the PSM mini-badge centered. No pattern — the
 * cards stay clean per stakeholder direction.
 */

export function VendorArchCard({ vendor }: { vendor: Vendor }) {
  const hasPhoto = Boolean(vendor.photo);

  return (
    <article className="group mx-auto flex w-full max-w-[280px] flex-col items-center text-center">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border-[2px] border-[color:var(--color-olive)]"
        style={{ borderRadius: "9999px 9999px 0 0" }}
      >
        {hasPhoto && vendor.photo ? (
          <Image
            src={vendor.photo}
            alt={vendor.photoAlt ?? vendor.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-[var(--duration-slow)] ease-[var(--ease-unhurried)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]">
            <PSMBadgeCoinFlip size={68} tone="light" />
            <MonoCaption className="text-[color:var(--color-sand-stone)]/85">
              Arriving Soon
            </MonoCaption>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5 sm:gap-3">
        <h3 className="flex items-center justify-center gap-1.5 font-[family-name:var(--font-sans)] text-[0.8125rem] font-bold uppercase leading-tight tracking-[0.04em] text-[color:var(--color-dark-bark)] sm:gap-2.5 sm:text-[1.0625rem] sm:tracking-[0.06em]">
          <CrosshairMark />
          <span>{vendor.name}</span>
          <CrosshairMark />
        </h3>
        <VendorLearnMoreModal vendor={vendor} />
      </div>
    </article>
  );
}

/**
 * CrosshairMark — a miniature of the PSM badge's circle-with-crosshair motif,
 * used as a typographic ornament around vendor names. Three strokes on a
 * 14-unit canvas: a centered circle and two axis lines that extend past it.
 * Picks up its color from the parent via `currentColor`.
 */
export function CrosshairMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      className="shrink-0 text-[color:var(--color-olive)]"
    >
      <circle cx="7" cy="7" r="4.2" />
      <line x1="7" y1="0.5" x2="7" y2="13.5" />
      <line x1="0.5" y1="7" x2="13.5" y2="7" />
    </svg>
  );
}

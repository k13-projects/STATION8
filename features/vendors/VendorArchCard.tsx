import Image from "next/image";
import { PSMBadgeCoinFlip } from "@/design-system/icons/PSMBadgeCoinFlip";
import { Button } from "@/design-system/primitives/Button";
import { MonoCaption, MonoLabel } from "@/design-system/primitives/Typography";
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

      <div className="mt-5 flex flex-col items-center gap-3">
        <MonoLabel className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] uppercase tracking-wide text-[color:var(--color-dark-bark)]">
          {vendor.name}
        </MonoLabel>
        <Button
          href={`#vendor-${vendor.slug}`}
          variant="primary"
          size="sm"
          className="!rounded-full !bg-[color:var(--color-olive)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-olive)] hover:!bg-[color:var(--color-dark-bark)]"
        >
          See More
        </Button>
      </div>
    </article>
  );
}

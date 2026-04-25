"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PSMBadgeCoinFlip } from "@/design-system/icons/PSMBadgeCoinFlip";
import { Button } from "@/design-system/primitives/Button";
import { Body, MonoCaption } from "@/design-system/primitives/Typography";
import { Magnetic } from "@/motion/primitives/Magnetic";
import { CrosshairMark } from "./VendorArchCard";
import type { Vendor } from "./vendors";

/**
 * VendorLearnMoreModal — the "Learn More" CTA on each vendor card opens a
 * native <dialog> with the vendor's photo, blurb, Instagram handle, and
 * website link. Mirrors features/about-modal/LearnMoreModal for consistency
 * — same a11y wins (focus trap, Escape, aria-modal) and the same backdrop
 * click handling.
 */

export function VendorLearnMoreModal({ vendor }: { vendor: Vendor }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeModal();
  };

  const hasPhoto = Boolean(vendor.photo);
  const handleUrl = vendor.handle
    ? `https://instagram.com/${vendor.handle.replace(/^@/, "")}`
    : null;
  const titleId = `vendor-modal-${vendor.slug}-title`;

  return (
    <>
      <Magnetic>
        <Button
          onClick={openModal}
          variant="primary"
          size="sm"
          className="!rounded-full !bg-[color:var(--color-olive)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-olive)] hover:!bg-[color:var(--color-dark-bark)]"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Learn More
        </Button>
      </Magnetic>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-labelledby={titleId}
        className="learn-more-dialog m-auto w-[min(94vw,520px)] max-w-none rounded-[10px] border border-[color:var(--color-olive)]/20 bg-[color:var(--color-sand-stone)] p-0 text-[color:var(--color-dark-bark)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop:bg-[color:var(--color-dark-bark)]/65 backdrop:backdrop-blur-sm"
      >
        <div className="relative max-h-[90svh] overflow-y-auto px-6 pb-7 pt-9 md:px-8 md:pb-9">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-dark-bark)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:bg-[color:var(--color-olive)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-olive)]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden border-[2px] border-[color:var(--color-olive)]"
            style={{ borderRadius: "9999px 9999px 0 0" }}
          >
            {hasPhoto && vendor.photo ? (
              <Image
                src={vendor.photo}
                alt={vendor.photoAlt ?? vendor.name}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                style={{ objectFit: "cover" }}
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

          <h2
            id={titleId}
            className="mt-6 flex items-center justify-center gap-2.5 font-[family-name:var(--font-sans)] text-[1.125rem] font-bold uppercase leading-tight tracking-[0.06em] text-[color:var(--color-dark-bark)] md:text-[1.25rem]"
          >
            <CrosshairMark />
            <span>{vendor.name}</span>
            <CrosshairMark />
          </h2>

          <MonoCaption className="mt-2 block text-center text-[color:var(--color-olive)]">
            {vendor.cuisine}
          </MonoCaption>

          <Body className="mt-5 text-center text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/90">
            {vendor.blurb}
          </Body>

          {(handleUrl || vendor.website) && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.12em]">
              {handleUrl && (
                <a
                  href={handleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--color-olive)] underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:text-[color:var(--color-dark-bark)] hover:underline"
                >
                  {vendor.handle}
                </a>
              )}
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--color-olive)] underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:text-[color:var(--color-dark-bark)] hover:underline"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

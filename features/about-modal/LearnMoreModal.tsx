"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/design-system/primitives/Button";
import { Body } from "@/design-system/primitives/Typography";
import { Magnetic } from "@/motion/primitives/Magnetic";

/**
 * LearnMoreModal — the "Learn More" CTA in the Who We Are section opens a
 * native <dialog> modal detailing the space, mission, and values.
 *
 * Using <dialog> + showModal() gives us free accessibility wins — focus trap,
 * inert background, Escape-to-close, `aria-modal="true"` — without pulling in
 * a third-party dependency. Backdrop click is wired up explicitly since the
 * native behavior is only "Escape key".
 */

export function LearnMoreModal() {
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

  return (
    <>
      <Magnetic>
        <Button
          onClick={openModal}
          variant="primary"
          className="!rounded-full !bg-[color:var(--color-sand-stone)] !text-[color:var(--color-dark-bark)] !border-[color:var(--color-sand-stone)] hover:!bg-white"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Learn More
        </Button>
      </Magnetic>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-labelledby="learn-more-title"
        className="learn-more-dialog m-auto w-[min(94vw,1040px)] max-w-none rounded-[10px] border border-[color:var(--color-olive)]/20 bg-[color:var(--color-sand-stone)] p-0 text-[color:var(--color-dark-bark)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop:bg-[color:var(--color-dark-bark)]/65 backdrop:backdrop-blur-sm"
      >
        <div className="relative max-h-[90svh] overflow-y-auto px-6 pb-7 pt-9 md:px-10 md:pb-9 md:pt-10">
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

          <h2
            id="learn-more-title"
            className="text-center font-[family-name:var(--font-display)] text-[1.375rem] uppercase leading-[1.1] tracking-tight text-[color:var(--color-dark-bark)] md:whitespace-nowrap md:text-[1.875rem]"
          >
            Where design meets flavor and food cultures unite to tell stories.
          </h2>

          <div className="mt-9 flex flex-col gap-8">
            <section className="text-center">
              <h3 className="font-[family-name:var(--font-mono)] text-[1.0625rem] font-bold uppercase leading-tight tracking-[0.14em] text-[color:var(--color-olive)]">
                Our Space
              </h3>
              <Body className="mt-3 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/90">
                Designed by Basile Studio, the 20,000 SQ FT space features 9 kitchens, 2 bars, and 2
                outdoor terraces, making it an immersive destination for food and flavor lovers.
                Whether you&rsquo;re savoring diverse dishes, a craft cocktail, or enjoying the
                vibrant atmosphere, there&rsquo;s something for everyone at STATION8.
              </Body>
              <Body className="mt-2.5 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/80">
                Parking is free in the Theater District garage connected to our building. Welcome.
              </Body>
            </section>

            <section className="text-center">
              <h3 className="font-[family-name:var(--font-mono)] text-[1.0625rem] font-bold uppercase leading-tight tracking-[0.14em] text-[color:var(--color-olive)]">
                Savor the Experience, Feel the Connection
              </h3>
              <Body className="mt-3 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/90">
                Our mission is to create a dynamic and sustainable food hall that connects the
                vibrant UCSD campus with the greater La Jolla community. By curating diverse,
                locally-sourced, and environmentally conscious dining experiences, we aim to foster
                connection, creativity, and learning.
              </Body>
              <Body className="mt-2.5 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/80">
                Committed to sustainability through responsible sourcing, waste reduction, and
                partnerships with local farms and purveyors, our market hall is a welcoming space
                where students, faculty, and the community come together to share meals, ideas, and
                cultures, nourishing both people and the planet.
              </Body>
            </section>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-[color:var(--color-olive)]/25" aria-hidden="true" />
            <span className="whitespace-nowrap font-[family-name:var(--font-mono)] text-[1rem] font-bold uppercase tracking-[0.18em] text-[color:var(--color-olive)]">
              Welcome to STATION8
            </span>
            <span className="h-px flex-1 bg-[color:var(--color-olive)]/25" aria-hidden="true" />
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {VALUES.map((item) => (
              <li key={item.keyword} className="flex flex-col pt-1 text-center">
                <span
                  aria-hidden="true"
                  className="mb-3 block h-[2px] w-10 bg-[color:var(--color-olive)]"
                />
                <Body className="text-[0.8125rem] leading-[1.55] text-[color:var(--color-dark-bark)]/85">
                  {item.text}
                </Body>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}

const VALUES = [
  {
    keyword: "Flavor",
    text: "Flavors inspire and fill our kitchens as we strive to make life tastier for all.",
  },
  {
    keyword: "Craft",
    text: "Form, function, and grit are imperative in what we craft and the beauty that shows up.",
  },
  {
    keyword: "Dedication",
    text: "Absolute dedication to creating exceptional experiences, we craft every detail to exceed expectations.",
  },
  {
    keyword: "Respect",
    text: "Thoughtful and considerate of our world impact, we have a deep respect for the planet, sustainability, and the people we serve.",
  },
];

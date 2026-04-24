import Image from "next/image";
import { PSMBadge } from "@/design-system/icons/PSMBadge";
import { ArchCard } from "@/design-system/primitives/ArchCard";
import { Button } from "@/design-system/primitives/Button";
import { PatternOverlay } from "@/design-system/primitives/PatternOverlay";
import {
  Body,
  DisplayLG,
  DisplayXL,
  H2,
  H3,
  MonoCaption,
  MonoLabel,
} from "@/design-system/primitives/Typography";
import { Footer } from "@/features/contact/Footer";
import { Nav } from "@/features/nav/Nav";

/**
 * P1 showcase home.
 *
 * Not the real long-scroll composition — that arrives in P4.
 * This page exists so Kazimiro and Lorena can see every design-system primitive
 * living together on one scroll: tokens, typography, logos, buttons, arch cards,
 * the pattern overlay, and the section-to-section color rhythm.
 */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero preview · Dark Bark ── */}
        <section
          aria-labelledby="hero-title"
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-[color:var(--color-dark-bark)] text-[color:var(--color-sand-stone)] pt-24"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.06} />
          </div>
          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
            <div className="flex items-start gap-6 mb-10">
              <PSMBadge size={88} />
              <div className="mt-3 space-y-1">
                <MonoCaption className="block text-[color:var(--color-sand-stone)]/70">
                  Station 8 · Public Market
                </MonoCaption>
                <MonoLabel className="block text-[color:var(--color-sand-stone)]/60">
                  UCSD Theater District · La Jolla, CA
                </MonoLabel>
              </div>
            </div>
            <DisplayXL
              id="hero-title"
              className="max-w-[18ch] text-[color:var(--color-sand-stone)]"
            >
              Where Global is Local.
            </DisplayXL>
            <Body className="mt-8 max-w-[52ch] text-[color:var(--color-sand-stone)]/75">
              Cuisine from Around the World. Around the Corner. A fusion of culture, flavors, food,
              drink, and people — designed to be an iconic food hall dining destination.
            </Body>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="#who-we-are" variant="primary">
                Learn More
              </Button>
              <Button href="#vendors" variant="secondary">
                Our Vendors
              </Button>
            </div>
            <div className="absolute bottom-8 right-6 md:right-12">
              <MonoCaption className="text-[color:var(--color-sand-stone)]/40">
                P1 preview · Design system
              </MonoCaption>
            </div>
          </div>
        </section>

        {/* ── Who We Are preview · Sand Stone ── */}
        <section
          id="who-we-are"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:px-12 md:py-32">
            <div className="space-y-4">
              <MonoCaption className="text-[color:var(--color-spice)]">Who We Are</MonoCaption>
              <DisplayLG>The premier San Diego restaurant collective.</DisplayLG>
            </div>
            <div className="space-y-6 md:pt-4">
              <Body className="text-[color:var(--color-dark-bark)]/85 text-lg">
                STATION8 Public Market is the restaurant collective and a new cultural cornerstone
                at UC San Diego's Theater District in La Jolla. Our chef-driven menus explore rich,
                traditional and global cuisines through a modern, California-inspired lens.
              </Body>
              <Body className="text-[color:var(--color-dark-bark)]/70">
                Designed by Basile Studio, the 20,000 sq ft space features 9 kitchens, 2 bars, and 2
                outdoor terraces — an immersive destination for food and flavor lovers.
              </Body>
              <div className="pt-2">
                <Button
                  href="/about"
                  variant="secondary"
                  className="!text-[color:var(--color-dark-bark)] !border-[color:var(--color-dark-bark)]/40 hover:!bg-[color:var(--color-dark-bark)]/5"
                >
                  Read the full story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vendors preview · Olive ── */}
        <section
          id="vendors"
          className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.07} />
          </div>
          <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
                  Our Vendors · Preview
                </MonoCaption>
                <DisplayLG className="max-w-[14ch]">Nine kitchens. One hall.</DisplayLG>
              </div>
              <MonoLabel className="text-[color:var(--color-sand-stone)]/60">
                Full grid arrives in P4
              </MonoLabel>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Photo card (full color) */}
              <ArchCard
                interactive
                tone="paper"
                photo={
                  <Image
                    src="/brand/psm-badge.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                      objectFit: "contain",
                      padding: "2rem",
                      backgroundColor: "var(--color-sand-stone)",
                    }}
                  />
                }
                meta={
                  <div className="flex items-center justify-between">
                    <MonoLabel>Lobster Lab</MonoLabel>
                    <MonoCaption className="text-[color:var(--color-dark-bark)]/60">
                      Seafood
                    </MonoCaption>
                  </div>
                }
              >
                <H2>Lobster Lab</H2>
                <Body className="text-[color:var(--color-dark-bark)]/75">
                  #1 ranked lobster roll in San Diego 2024. Seafood concept from Carlsbad, CA.
                </Body>
              </ArchCard>

              {/* Typographic placeholder card */}
              <ArchCard
                interactive
                tone="paper"
                photo={
                  <div className="relative flex h-full w-full items-center justify-center bg-[color:var(--color-sand-stone)]">
                    <div className="text-[color:var(--color-olive)]">
                      <PatternOverlay opacity={0.35} cell={36} tick={6} />
                    </div>
                    <div className="relative flex flex-col items-center gap-4">
                      <PSMBadge size={56} className="text-[color:var(--color-olive)]" />
                      <MonoCaption className="text-[color:var(--color-olive)]">
                        Arriving Soon
                      </MonoCaption>
                    </div>
                  </div>
                }
                meta={
                  <div className="flex items-center justify-between">
                    <MonoLabel>Baikohken Ramen</MonoLabel>
                    <MonoCaption className="text-[color:var(--color-dark-bark)]/60">
                      Ramen
                    </MonoCaption>
                  </div>
                }
              >
                <H2>Baikohken Ramen</H2>
                <Body className="text-[color:var(--color-dark-bark)]/75">
                  Signature "W soup" — rich meat broth blended with delicate fish broth for
                  perfectly balanced, authentic ramen.
                </Body>
              </ArchCard>

              {/* Inverse-tone card */}
              <ArchCard
                interactive
                tone="inverse"
                photo={
                  <div className="relative flex h-full w-full items-center justify-center bg-[color:var(--color-dark-bark)]">
                    <div className="text-[color:var(--color-sand-stone)]">
                      <PatternOverlay opacity={0.2} cell={36} tick={6} />
                    </div>
                    <div className="relative flex flex-col items-center gap-4">
                      <PSMBadge size={56} />
                      <MonoCaption>Arriving Soon</MonoCaption>
                    </div>
                  </div>
                }
                meta={
                  <div className="flex items-center justify-between">
                    <MonoLabel>MSG Food Group</MonoLabel>
                    <MonoCaption className="text-[color:var(--color-sand-stone)]/60">
                      TBA
                    </MonoCaption>
                  </div>
                }
              >
                <H2>MSG Food Group</H2>
                <Body className="text-[color:var(--color-sand-stone)]/75">
                  Concept announcement coming soon.
                </Body>
              </ArchCard>
            </div>
          </div>
        </section>

        {/* ── Primitives inventory · Sand Stone, editorial strip ── */}
        <section className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]">
          <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-16 space-y-3">
              <MonoCaption className="text-[color:var(--color-spice)]">
                Design System · P1 Inventory
              </MonoCaption>
              <DisplayLG className="max-w-[20ch]">The pieces that will build every page.</DisplayLG>
              <Body className="max-w-[52ch] text-[color:var(--color-dark-bark)]/70">
                Typography, buttons, arch cards, pattern overlay, and brand marks — locked to
                tokens. Everything from here forward composes these.
              </Body>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
              <div className="space-y-6">
                <MonoCaption className="text-[color:var(--color-spice)]">Typography</MonoCaption>
                <div className="space-y-4 border-l-2 border-[color:var(--color-dark-bark)]/15 pl-6">
                  <DisplayLG>Display LG</DisplayLG>
                  <H3 as="h4">H1 · 2.25rem Industry</H3>
                  <H2 as="h5">H2 · 1.75rem Grotesk Bold</H2>
                  <H3 as="h6">H3 · 1.25rem Grotesk Medium</H3>
                  <Body>
                    Body — Grotesk Regular, 1rem, leading-relaxed. Prose and in-card descriptions
                    live here.
                  </Body>
                  <MonoLabel>MonoLabel · form labels, addresses</MonoLabel>
                  <MonoCaption>Mono Caption · Eyebrow · Tag</MonoCaption>
                </div>
              </div>

              <div className="space-y-6">
                <MonoCaption className="text-[color:var(--color-spice)]">
                  Buttons · Controls
                </MonoCaption>
                <div className="space-y-6 border-l-2 border-[color:var(--color-dark-bark)]/15 pl-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button
                      variant="primary"
                      className="!bg-[color:var(--color-dark-bark)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-dark-bark)]"
                    >
                      Primary
                    </Button>
                    <Button
                      variant="secondary"
                      className="!text-[color:var(--color-dark-bark)] !border-[color:var(--color-dark-bark)]/40 hover:!bg-[color:var(--color-dark-bark)]/5"
                    >
                      Secondary
                    </Button>
                    <Button variant="ghost" className="!text-[color:var(--color-dark-bark)]">
                      Ghost
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button
                      variant="primary"
                      size="sm"
                      className="!bg-[color:var(--color-dark-bark)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-dark-bark)]"
                    >
                      Small Primary
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="!text-[color:var(--color-dark-bark)] !border-[color:var(--color-dark-bark)]/40"
                    >
                      Small Secondary
                    </Button>
                  </div>
                </div>

                <MonoCaption className="text-[color:var(--color-spice)] pt-8 block">
                  Color Palette
                </MonoCaption>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ["Olive", "var(--color-olive)"],
                    ["Green Glass", "var(--color-green-glass)"],
                    ["Spice", "var(--color-spice)"],
                    ["Dark Bark", "var(--color-dark-bark)"],
                    ["Sand Stone", "var(--color-sand-stone)"],
                    ["May", "var(--color-may)"],
                    ["Rust", "var(--color-rust)"],
                    ["River Stone", "var(--color-river-stone)"],
                    ["Salmon", "var(--color-salmon)"],
                    ["Sea Glass", "var(--color-sea-glass)"],
                  ].map(([name, value]) => (
                    <div key={name} className="space-y-1">
                      <div
                        className="aspect-square border border-[color:var(--color-dark-bark)]/15"
                        style={{ backgroundColor: value }}
                      />
                      <MonoCaption className="text-[color:var(--color-dark-bark)]/70 block">
                        {name}
                      </MonoCaption>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

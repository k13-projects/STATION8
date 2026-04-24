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
  MonoCaption,
  MonoLabel,
} from "@/design-system/primitives/Typography";
import { Footer } from "@/features/contact/Footer";
import { Nav } from "@/features/nav/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero · Dark Bark ── */}
        <section
          aria-labelledby="hero-title"
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-[color:var(--color-dark-bark)] pt-24 text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.06} />
          </div>
          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
            <div className="mb-10 flex items-start gap-6">
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
          </div>
        </section>

        {/* ── Who We Are · Sand Stone ── */}
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
              <Body className="text-lg text-[color:var(--color-dark-bark)]/85">
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
                  className="!border-[color:var(--color-dark-bark)]/40 !text-[color:var(--color-dark-bark)] hover:!bg-[color:var(--color-dark-bark)]/5"
                >
                  Read the full story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Vendors · Olive ── */}
        <section
          id="vendors"
          className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.07} />
          </div>
          <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-12 space-y-3">
              <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
                Our Vendors
              </MonoCaption>
              <DisplayLG className="max-w-[14ch]">Nine kitchens. One hall.</DisplayLG>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <ArchCard
                interactive
                tone="paper"
                photo={
                  <Image
                    src="/brand/vendor-lobster-lab.jpg"
                    alt="Lobster roll with microgreens on a metal tray"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
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
                  #1 ranked lobster roll in San Diego 2024. Seafood concept from Carlsbad.
                </Body>
              </ArchCard>

              <ArchCard
                interactive
                tone="paper"
                photo={
                  <Image
                    src="/brand/vendor-moto-pizza.png"
                    alt="Assortment of Detroit-style pizzas with varied toppings"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                }
                meta={
                  <div className="flex items-center justify-between">
                    <MonoLabel>MOTO Pizza</MonoLabel>
                    <MonoCaption className="text-[color:var(--color-dark-bark)]/60">
                      Pizza
                    </MonoCaption>
                  </div>
                }
              >
                <H2>MOTO Pizza</H2>
                <Body className="text-[color:var(--color-dark-bark)]/75">
                  Detroit, New York, and Roman styles with Filipino influences. First San Diego
                  outpost from the Seattle-based favorite.
                </Body>
              </ArchCard>

              <ArchCard
                interactive
                tone="paper"
                photo={
                  <Image
                    src="/brand/vendor-la-vida.jpg"
                    alt="Healthy bowl of fresh ingredients from La Vida"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                }
                meta={
                  <div className="flex items-center justify-between">
                    <MonoLabel>La Vida</MonoLabel>
                    <MonoCaption className="text-[color:var(--color-dark-bark)]/60">
                      Healthy
                    </MonoCaption>
                  </div>
                }
              >
                <H2>La Vida</H2>
                <Body className="text-[color:var(--color-dark-bark)]/75">
                  A San Diego healthy food brand where health meets happiness. Smoothies, salads,
                  wraps, and bowls.
                </Body>
              </ArchCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

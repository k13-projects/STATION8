import Image from "next/image";
import { PSMBadge } from "@/design-system/icons/PSMBadge";
import { PSMBadgeAnimated } from "@/design-system/icons/PSMBadgeAnimated";
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
import { Magnetic } from "@/motion/primitives/Magnetic";
import { Marquee } from "@/motion/primitives/Marquee";
import { Reveal } from "@/motion/primitives/Reveal";
import { SplitReveal } from "@/motion/primitives/SplitReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero · Dark Bark ── */}
        <section
          aria-labelledby="hero-title"
          data-section-bg="--color-dark-bark"
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-[color:var(--color-dark-bark)] pt-24 text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.06} />
          </div>
          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
            <Reveal as="div" className="mb-10 flex items-start gap-6">
              <PSMBadgeAnimated size={88} delay={0.4} />
              <div className="mt-3 space-y-1">
                <MonoCaption className="block text-[color:var(--color-sand-stone)]/70">
                  Station 8 · Public Market
                </MonoCaption>
                <MonoLabel className="block text-[color:var(--color-sand-stone)]/60">
                  UCSD Theater District · La Jolla, CA
                </MonoLabel>
              </div>
            </Reveal>

            <DisplayXL
              id="hero-title"
              className="max-w-[18ch] text-[color:var(--color-sand-stone)]"
            >
              <SplitReveal text="Where Global is Local." stagger={0.07} delay={0.9} />
            </DisplayXL>

            <Reveal delay={1.4} distance={20}>
              <Body className="mt-8 max-w-[52ch] text-[color:var(--color-sand-stone)]/75">
                Cuisine from Around the World. Around the Corner. A fusion of culture, flavors,
                food, drink, and people — designed to be an iconic food hall dining destination.
              </Body>
            </Reveal>

            <Reveal delay={1.6} distance={20} className="mt-12 flex flex-wrap gap-4">
              <Magnetic>
                <Button href="#who-we-are" variant="primary">
                  Learn More
                </Button>
              </Magnetic>
              <Button href="#vendors" variant="secondary">
                Our Vendors
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── Tagline marquee — between hero and mission ── */}
        <div
          data-section-bg="--color-dark-bark"
          className="relative overflow-hidden border-y border-[color:var(--color-sand-stone)]/15 bg-[color:var(--color-dark-bark)] py-6 text-[color:var(--color-sand-stone)]"
        >
          <Marquee duration={50}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: marquee segments are positional
                key={i}
                className="flex shrink-0 items-center gap-16"
              >
                <span
                  className="font-[family-name:var(--font-display-outline)] text-[length:var(--text-display-md)] uppercase tracking-[0.04em]"
                  style={{
                    WebkitTextStroke: "1px currentColor",
                    color: "transparent",
                  }}
                >
                  Where Global is Local
                </span>
                <PSMBadge size={28} decorative className="shrink-0 opacity-60" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ── Who We Are · Sand Stone ── */}
        <section
          id="who-we-are"
          data-section-bg="--color-sand-stone"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:px-12 md:py-32">
            <div className="space-y-4">
              <Reveal>
                <MonoCaption className="text-[color:var(--color-spice)]">Who We Are</MonoCaption>
              </Reveal>
              <DisplayLG>
                <SplitReveal text="The premier San Diego restaurant collective." stagger={0.05} />
              </DisplayLG>
            </div>
            <div className="space-y-6 md:pt-4">
              <Reveal delay={0.15}>
                <Body className="text-lg text-[color:var(--color-dark-bark)]/85">
                  STATION8 Public Market is the restaurant collective and a new cultural cornerstone
                  at UC San Diego's Theater District in La Jolla. Our chef-driven menus explore
                  rich, traditional and global cuisines through a modern, California-inspired lens.
                </Body>
              </Reveal>
              <Reveal delay={0.3}>
                <Body className="text-[color:var(--color-dark-bark)]/70">
                  Designed by Basile Studio, the 20,000 sq ft space features 9 kitchens, 2 bars, and
                  2 outdoor terraces — an immersive destination for food and flavor lovers.
                </Body>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="pt-2">
                  <Button
                    href="/about"
                    variant="secondary"
                    className="!border-[color:var(--color-dark-bark)]/40 !text-[color:var(--color-dark-bark)] hover:!bg-[color:var(--color-dark-bark)]/5"
                  >
                    Read the full story
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Our Vendors · Olive ── */}
        <section
          id="vendors"
          data-section-bg="--color-olive"
          className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.07} />
          </div>
          <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
            <div className="mb-12 space-y-3">
              <Reveal>
                <MonoCaption className="text-[color:var(--color-sand-stone)]/70">
                  Our Vendors
                </MonoCaption>
              </Reveal>
              <DisplayLG className="max-w-[14ch]">
                <SplitReveal text="Nine kitchens. One hall." stagger={0.06} />
              </DisplayLG>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Reveal delay={0.05}>
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
              </Reveal>

              <Reveal delay={0.15}>
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
              </Reveal>

              <Reveal delay={0.25}>
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
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

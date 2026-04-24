import Image from "next/image";
import { Button } from "@/design-system/primitives/Button";
import { PatternOverlay } from "@/design-system/primitives/PatternOverlay";
import { SectionChevron } from "@/design-system/primitives/SectionChevron";
import { SectionLabel } from "@/design-system/primitives/SectionLabel";
import { Body, DisplayLG, DisplayXL, H1, MonoLabel } from "@/design-system/primitives/Typography";
import { LearnMoreModal } from "@/features/about-modal/LearnMoreModal";
import { Footer } from "@/features/contact/Footer";
import { EventDateCard } from "@/features/events/EventDateCard";
import { Nav } from "@/features/nav/Nav";
import { SectionNav } from "@/features/nav/SectionNav";
import { VendorArchCard } from "@/features/vendors/VendorArchCard";
import { VENDORS } from "@/features/vendors/vendors";
import { Magnetic } from "@/motion/primitives/Magnetic";
import { Reveal } from "@/motion/primitives/Reveal";
import { SplitReveal } from "@/motion/primitives/SplitReveal";

/**
 * STATION8 home — composed 1:1 from ASSETS/ WEBSITE STRUCTURE 1 - Home .pdf.
 *
 * Sequence:
 *   Nav (centered lockup + hamburger)
 *   1. Hero — full-viewport Basile interior render
 *   2. SectionNav — link row that sticks to the top after the hero
 *   3. "WHERE GLOBAL IS LOCAL" tagline strip (Sand Stone)
 *   4. WHO WE ARE — Olive + pattern
 *   5. Divider render — wayfinding / greenhouse
 *   6. OUR VENDORS — 9 arch cards (white background)
 *   7. EVENTS — Olive + pattern, 3 date cards
 *   8. Divider render — dining area
 *   9. BOOKINGS — Sand Stone split
 *   10. VISIT US — split with building photo
 *   11. CONTACT — Olive + pattern, big PSM badge (Footer component)
 */

const EVENTS = [
  { month: "JUNE", day: 4, title: "Opening Week · Tasting Pass" },
  { month: "JUNE", day: 14, title: "Vendor Showcase · La Jolla Market" },
  { month: "JUNE", day: 21, title: "Summer Solstice Long Table Dinner" },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* ── 1. Hero ── */}
        <section
          aria-label="STATION8 Public Market"
          data-section-bg="--color-dark-bark"
          className="relative h-[55svh] min-h-[480px] w-full overflow-hidden bg-[color:var(--color-dark-bark)]"
        >
          <Image
            src="/renders/hero-bar.png"
            alt="STATION8 Public Market bar interior by Basile Studio"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Subtle top-down gradient so the nav stays legible over any render */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--color-dark-bark)]/70 to-transparent"
          />
        </section>

        {/* ── 2. SectionNav — sits under hero, sticks on scroll ── */}
        <SectionNav />

        {/* ── 3. Tagline strip ── */}
        <section
          data-section-bg="--color-sand-stone"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-5 px-6 py-20 text-center md:px-12 md:py-28">
            <DisplayXL as="h1" className="max-w-[22ch] uppercase tracking-tight">
              <SplitReveal text="Where Global is Local" stagger={0.06} />
            </DisplayXL>
            <Reveal delay={0.3}>
              <Body className="italic text-[color:var(--color-dark-bark)]/75">
                Cuisine from Around the World. Around the Corner.
              </Body>
            </Reveal>
          </div>
          {/* Chevron — tagline (Sand Stone) pokes down into Who We Are (Olive) */}
          <SectionChevron tone="sand-stone" size="sm" />
        </section>

        {/* ── 4. WHO WE ARE ── */}
        <section
          id="who-we-are"
          data-section-bg="--color-olive"
          className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.08} size={60} position="50% 50%" />
          </div>
          <div className="relative mx-auto max-w-[1100px] px-6 py-24 text-center md:px-12 md:py-36">
            <Reveal>
              <div className="mb-14">
                <SectionLabel tone="light">Who We Are</SectionLabel>
              </div>
            </Reveal>
            <DisplayLG
              as="h2"
              className="mx-auto max-w-[18ch] font-[family-name:var(--font-display)] uppercase tracking-tight"
            >
              <SplitReveal text="The premier San Diego restaurant collective" stagger={0.05} />
            </DisplayLG>
            <Reveal delay={0.35}>
              <Body className="mx-auto mt-8 max-w-[52ch] italic text-[color:var(--color-sand-stone)]/85">
                A fusion of culture, flavors, food, drink, and people, designed to be an iconic food
                hall dining destination.
              </Body>
            </Reveal>
            <Reveal delay={0.5}>
              <Body className="mx-auto mt-10 max-w-[62ch] text-[color:var(--color-sand-stone)]/80">
                STATION8 Public Market is the restaurant collective and a new cultural cornerstone
                at UC San Diego's Theater District in La Jolla. Our chef-driven menus explore rich,
                traditional &amp; global cuisines through a modern, California inspired lens.
                STATION8 offers a one-of-a-kind premier food hall experience.
              </Body>
            </Reveal>
            <Reveal delay={0.7}>
              <div className="mt-12 flex justify-center">
                <LearnMoreModal />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. Divider render — wayfinding ── */}
        <Divider
          src="/renders/hero-wayfinding.png"
          alt="STATION8 wayfinding badge under hanging greenery"
        />

        {/* ── 6. OUR VENDORS ── */}
        <section
          id="vendors"
          data-section-bg="--color-sand-stone"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
            <Reveal>
              <div className="mb-16">
                <SectionLabel tone="dark">Our Vendors</SectionLabel>
              </div>
            </Reveal>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
              {VENDORS.map((vendor, i) => (
                <Reveal key={vendor.slug} delay={(i % 3) * 0.08}>
                  <VendorArchCard vendor={vendor} />
                </Reveal>
              ))}
            </div>
          </div>
          {/* Chevron — Our Vendors (Sand Stone) pokes down into Events (Olive) */}
          <SectionChevron tone="sand-stone" size="sm" />
        </section>

        {/* ── 7. EVENTS ── */}
        <section
          id="events"
          data-section-bg="--color-olive"
          className="relative overflow-hidden bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)]"
        >
          <div className="text-[color:var(--color-sand-stone)]">
            <PatternOverlay opacity={0.08} cover position="50% 50%" />
          </div>
          <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
            <Reveal>
              <div className="mb-16">
                <SectionLabel tone="light">Events</SectionLabel>
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {EVENTS.map((e, i) => (
                <Reveal key={`${e.month}-${e.day}`} delay={i * 0.08}>
                  <EventDateCard month={e.month} day={e.day} title={e.title} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Divider render — dining ── */}
        <Divider src="/renders/hero-dining.png" alt="STATION8 dining area with hanging greenery" />

        {/* ── 9. BOOKINGS ── */}
        <section
          id="bookings"
          data-section-bg="--color-sand-stone"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
            <Reveal>
              <div className="mb-12">
                <SectionLabel tone="dark" align="start">
                  Bookings
                </SectionLabel>
              </div>
            </Reveal>
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
              <DisplayLG
                as="h2"
                className="max-w-[16ch] font-[family-name:var(--font-display)] uppercase tracking-tight"
              >
                <SplitReveal text="Planning something special?" stagger={0.05} />
              </DisplayLG>
              <div className="space-y-8">
                <Reveal delay={0.15}>
                  <Body className="max-w-[44ch] text-[color:var(--color-dark-bark)]/85">
                    From birthdays to big celebrations, STATION8 is the perfect place to gather,
                    share, and indulge.
                  </Body>
                </Reveal>
                <Reveal delay={0.3}>
                  <Magnetic>
                    <Button
                      href="#bookings-form"
                      variant="primary"
                      className="!rounded-full !bg-[color:var(--color-spice)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-spice)] hover:!bg-[color:var(--color-dark-bark)]"
                    >
                      Get in Touch
                    </Button>
                  </Magnetic>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. VISIT US ── */}
        <section
          id="visit-us"
          data-section-bg="--color-sand-stone"
          className="relative bg-[color:var(--color-sand-stone)] text-[color:var(--color-dark-bark)]"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
            <div className="space-y-8">
              <Reveal>
                <SectionLabel tone="dark" align="start">
                  Where We Are
                </SectionLabel>
              </Reveal>
              <H1
                as="h2"
                className="max-w-[14ch] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] uppercase tracking-tight md:text-[length:var(--text-display-md)]"
              >
                <SplitReveal text="How to get to STATION8" stagger={0.05} />
              </H1>

              <Reveal delay={0.2}>
                <div className="flex items-start gap-3 pt-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-[2px] h-6 w-6 fill-[color:var(--color-dark-bark)]"
                    aria-hidden="true"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <MonoLabel className="font-[family-name:var(--font-sans)] text-lg font-semibold">
                    La Jolla, CA 92037
                  </MonoLabel>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <Body className="max-w-[40ch] text-[color:var(--color-dark-bark)]/80">
                  Our market is open daily from
                  <br />
                  <strong className="text-[color:var(--color-dark-bark)]">
                    7:00 am to 9:00 pm
                  </strong>
                </Body>
              </Reveal>
              <Reveal delay={0.4}>
                <Body className="max-w-[40ch] text-[color:var(--color-dark-bark)]/75">
                  Parking is free in the Theater District garage connected to our building.
                </Body>
              </Reveal>

              <Reveal delay={0.5}>
                <div>
                  <Button
                    href="https://maps.apple.com/?q=STATION8+Public+Market+La+Jolla"
                    variant="primary"
                    className="!rounded-full !bg-[color:var(--color-spice)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-spice)] hover:!bg-[color:var(--color-dark-bark)]"
                  >
                    Go Now
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/renders/station8-exterior.png"
                  alt="STATION8 Public Market building exterior at UCSD Theater District"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer lives inside <main> so the sticky SectionNav keeps pinning
            through the Let's Connect section — sticky un-sticks at its parent's
            bottom, so main must contain every section the bar should ride over. */}
        <Footer />
      </main>
    </>
  );
}

function Divider({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      aria-hidden="false"
      className="relative h-[55svh] min-h-[480px] w-full overflow-hidden bg-[color:var(--color-dark-bark)]"
    >
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
    </div>
  );
}

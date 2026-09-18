"use client";

import { useEffect, useState } from "react";

import { Body } from "@/design-system/primitives/Typography";
import { Reveal } from "@/motion/primitives/Reveal";

import { EventDateCard } from "./EventDateCard";
import { fetchEvents, normalizeUrl, type EventItem } from "@/lib/events";

/**
 * The events row, fed by the published Google Sheet (see lib/events.ts).
 *
 * Client-side on purpose, matching Miramar and Global Fork: the client edits
 * the sheet and the next page load has it, with no rebuild and no waiting on a
 * cache. This is a client component only because of that fetch; everything it
 * renders is the same markup the server used to render from a constant.
 *
 * Starts empty rather than seeded with sample events. The other two sites seed
 * a hardcoded list, and that is how STATION8 spent three months advertising an
 * Opening Week on 4 June that never existed. An empty calendar that says it is
 * empty costs a client nothing; an invented one costs them a guest who turned up.
 */
export function EventsList() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    let active = true;
    fetchEvents()
      .then((rows) => {
        if (active) setEvents(rows);
      })
      .catch(() => {
        /* leave it empty: the honest line below is the right answer either way */
      });
    return () => {
      active = false;
    };
  }, []);

  if (events.length === 0) {
    return (
      /* The section keeps its place rather than disappearing: the nav carries an
         EVENTS link, and a link that scrolls to nothing is a worse answer than a
         short honest one. */
      <Reveal>
        <Body className="max-w-[46ch] text-[color:var(--color-sand-stone)]/85">
          Our calendar opens with the market. Tastings, vendor nights and long table
          dinners will be listed here as soon as the dates are set.
        </Body>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {events.map((e, i) => {
        const href = normalizeUrl(e.url ?? "");
        const card = (
          <EventDateCard month={e.month} day={Number(e.day)} title={e.title} />
        );
        return (
          <Reveal key={`${e.month}-${e.day}-${e.title}`} delay={i * 0.08}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-sand-stone)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {card}
              </a>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

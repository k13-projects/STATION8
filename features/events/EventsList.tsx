"use client";

import { useEffect, useState } from "react";

import { Body } from "@/design-system/primitives/Typography";
import { Reveal } from "@/motion/primitives/Reveal";

import { EventDateCard } from "./EventDateCard";
import { classifyEvents, type DatedEvent } from "@/lib/event-lifecycle";
import { fetchEvents, normalizeUrl } from "@/lib/events";

/**
 * The events row, fed by the published Google Sheet (see lib/events.ts).
 *
 * Client-side on purpose, matching Miramar and Global Fork: the client edits
 * the sheet and the next page load has it, with no rebuild and no waiting on a
 * cache. This is a client component only because of that fetch; everything it
 * renders is the same markup the server used to render from a constant.
 *
 * Starts empty rather than seeded with sample events, and that is now the rule
 * on all three sites (Kazim, 2026-09-18). Hardcoded sample events are how this
 * site spent three months advertising an Opening Week on 4 June that never
 * existed. An empty calendar that says it is empty costs a client nothing; an
 * invented one costs them a guest who turned up.
 *
 * The empty state is the same on Miramar, Global Fork and here: one honest
 * line, then a follow button, so a visitor who arrived for events leaves with
 * somewhere to go. Copy is identical across the three on purpose; the line is
 * true whether a venue is trading or, as here, has not opened yet, and this
 * page already carries a Coming Soon stamp that says which.
 */
export function EventsList() {
  const [events, setEvents] = useState<DatedEvent[]>([]);

  useEffect(() => {
    let active = true;
    fetchEvents()
      .then((rows) => {
        // Sorted and filtered here rather than in the sheet, so the client can
        // type rows in any order and never has to delete a finished one.
        if (active) setEvents(classifyEvents(rows));
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
        <div className="flex flex-col items-start gap-6">
          <Body className="max-w-[46ch] text-[color:var(--color-sand-stone)]/85">
            No events scheduled right now. Check back soon.
          </Body>
          <a
            href="https://instagram.com/station8publicmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[color:var(--color-sand-stone)]/35 px-6 py-3 font-[family-name:var(--font-mono)] text-[length:var(--text-mono-label)] uppercase tracking-[0.18em] text-[color:var(--color-sand-stone)] transition hover:bg-[color:var(--color-sand-stone)] hover:text-[color:var(--color-dark-bark)]"
          >
            Follow @station8publicmarket for updates
          </a>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {events.map((e, i) => {
        const href = normalizeUrl(e.url ?? "");
        const card = (
          <EventDateCard
            month={e.monthLabel}
            day={Number(e.day)}
            title={e.title}
            past={e.state === "past"}
          />
        );
        return (
          <Reveal key={`${e.timestamp}-${e.title}`} delay={i * 0.08}>
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

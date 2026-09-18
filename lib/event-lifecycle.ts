import type { EventItem } from "./events";

/**
 * What happens to an event after its date passes.
 *
 * Kazim, 2026-09-18: "rather than deleting it right away it could be a good
 * idea to keep it there for a while for visitors to see what they missed and
 * get FOMO." So an event has three lives:
 *
 *   upcoming  today or later          full colour, listed first, soonest first
 *   past      up to 60 days ago       greyed, labelled Past, listed after
 *   gone      more than 60 days ago   not rendered at all
 *
 * The client never deletes a row to make this happen, which is the point: a
 * calendar that needs housekeeping to stay honest will not stay honest. They
 * add events and the site retires them.
 *
 * ── The year problem, which is the whole difficulty here ──
 *
 * The sheet carries Month and Day and no year, so "APRIL 1" cannot be placed on
 * a timeline. That is not a detail: without a year, a stale row left in the
 * sheet and a row genuinely meant for next April are the same three characters.
 *
 * So there is an optional sixth column, Year, appended after URL where it
 * cannot disturb the five columns the three live sheets already use. When it is
 * filled in, the date is exact and everything below is arithmetic.
 *
 * When it is blank, the rule is deliberately the dumbest one that can be
 * explained to a client in a sentence: **no year means this year.** The
 * alternative, rolling a long-past date forward to its next occurrence, reads
 * as helpful and is how Global Fork's 1 April "Coming Soon" row would have
 * quietly reappeared as 1 April next year, which is the invented-content
 * problem wearing a different hat. This way a forgotten row ages out on its own
 * after sixty days and stays out.
 *
 * The cost of that choice, stated plainly because whoever reads this next will
 * hit it: an event typed in December for the coming January needs its Year, or
 * it is read as eleven months ago and never appears. That is what the column is
 * for, and it is why the header should be added to every sheet.
 *
 * ── Time zone ──
 *
 * "Today" is today in California, where the halls are, not in the visitor's
 * own time zone. Without that, an event is past for a visitor in Tokyo while it
 * is still tonight's plan for the person standing outside the building.
 */

/** How long a finished event keeps its place on the page. */
export const PAST_EVENT_GRACE_DAYS = 60;

/** The venues are all in California. */
const VENUE_TIME_ZONE = "America/Los_Angeles";

export type EventState = "upcoming" | "past";

export type DatedEvent = EventItem & {
  /** Midnight of the event's day, as a UTC timestamp, for comparison only. */
  timestamp: number;
  state: EventState;
};

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * Month name to 0-11. Accepts what people actually type: "APRIL", "april",
 * "Apr", "SEPT". Returns null for anything it cannot place, which is how a
 * typo drops one row instead of shifting the whole calendar by a month.
 */
export function monthIndex(raw: string): number | null {
  const m = raw.trim().toLowerCase().replace(/\.$/, "");
  if (!m) return null;
  const exact = MONTHS.indexOf(m);
  if (exact !== -1) return exact;
  const prefixed = MONTHS.findIndex((name) => name.startsWith(m) && m.length >= 3);
  return prefixed === -1 ? null : prefixed;
}

/** Today in the venue's time zone, as {year, month, day}. */
function todayAtVenue(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: VENUE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month") - 1, day: get("day") };
}

/** A day as a UTC timestamp, so two days can be compared without time zones. */
function dayStamp(year: number, month: number, day: number): number {
  return Date.UTC(year, month, day);
}

const DAY_MS = 86_400_000;

/**
 * Place each row on the calendar and decide what happens to it.
 *
 * Rows that cannot be placed at all, a month that is not a month or a day that
 * is not a number, are dropped rather than guessed at: a wrong date on a live
 * page is worse than a missing one.
 *
 * Returns upcoming events soonest first, then past events most recent first,
 * which is the order a visitor reads them in: what is coming, then what they
 * just missed.
 */
export function classifyEvents(rows: EventItem[], now: Date = new Date()): DatedEvent[] {
  const today = todayAtVenue(now);
  const todayStamp = dayStamp(today.year, today.month, today.day);
  const cutoff = todayStamp - PAST_EVENT_GRACE_DAYS * DAY_MS;

  const dated: DatedEvent[] = [];

  for (const row of rows) {
    const month = monthIndex(row.month);
    const day = Number(String(row.day).trim());
    if (month === null || !Number.isInteger(day) || day < 1 || day > 31) continue;

    const rawYear = String(row.year ?? "").trim();
    const year = rawYear ? Number(rawYear) : today.year;
    if (!Number.isInteger(year) || year < 2000 || year > 2999) continue;

    const timestamp = dayStamp(year, month, day);
    // A day-overflow, e.g. FEBRUARY 30, lands in the next month. Drop it rather
    // than silently move the event.
    if (new Date(timestamp).getUTCMonth() !== month) continue;

    if (timestamp < cutoff) continue;

    dated.push({
      ...row,
      timestamp,
      state: timestamp >= todayStamp ? "upcoming" : "past",
    });
  }

  const upcoming = dated
    .filter((e) => e.state === "upcoming")
    .sort((a, b) => a.timestamp - b.timestamp);
  const past = dated.filter((e) => e.state === "past").sort((a, b) => b.timestamp - a.timestamp);

  return [...upcoming, ...past];
}

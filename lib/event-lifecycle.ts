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
 * When it is blank the year is inferred, and the inference has to thread one
 * needle (Kazim, 2026-09-18: "be smart about it"). Two different rows look
 * identical and mean opposite things:
 *
 *   a January event typed in December     means next year, and must appear
 *   an April row nobody deleted           means last spring, and must not
 *
 * Both are "a month and a day already behind us". What separates them is how
 * far ahead the next occurrence is. Somebody entering an event without a year
 * is entering something coming up soon, weeks or a couple of months out, not
 * something eleven months away. So:
 *
 *   1. Try this year. If that date is today, or ahead, or within the sixty-day
 *      grace behind, use it.
 *   2. Otherwise it is well behind us, so try next year, and accept that only
 *      if it falls inside NO_YEAR_LOOKAHEAD_DAYS. A January event read in
 *      December is twenty days out and passes. An April row read in September
 *      is nearly seven months out and does not.
 *   3. Otherwise the row is stale. Drop it.
 *
 * The window is the whole mechanism, so it is chosen with the failure modes in
 * mind rather than for neatness. Too long and a forgotten row quietly
 * reappears as a date nobody planned, which is invented content and invisible.
 * Too short and a real event does not show, which the client notices within a
 * day and tells us about. The second failure is self-correcting and the first
 * is not, so the window stays deliberately tight.
 *
 * Filling in Year removes all of this. It is the answer for anything further
 * out than the window, and it is why the header belongs on every sheet.
 *
 * ── Time zone ──
 *
 * "Today" is today in California, where the halls are, not in the visitor's
 * own time zone. Without that, an event is past for a visitor in Tokyo while it
 * is still tonight's plan for the person standing outside the building.
 */

/** How long a finished event keeps its place on the page. */
export const PAST_EVENT_GRACE_DAYS = 60;

/**
 * With no Year given, how far ahead next year's occurrence may fall before the
 * row is treated as stale rather than upcoming. See the note above: this is the
 * line between "typed in December for January" and "left in the sheet since
 * April".
 */
export const NO_YEAR_LOOKAHEAD_DAYS = 120;

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

    let timestamp: number;
    if (rawYear) {
      const year = Number(rawYear);
      if (!Number.isInteger(year) || year < 2000 || year > 2999) continue;
      timestamp = dayStamp(year, month, day);
      // A day-overflow, e.g. FEBRUARY 30, lands in the next month. Drop it
      // rather than silently move the event.
      if (new Date(timestamp).getUTCMonth() !== month) continue;
      if (timestamp < cutoff) continue;
    } else {
      const thisYear = dayStamp(today.year, month, day);
      const nextYear = dayStamp(today.year + 1, month, day);
      // Check the overflow on the candidate that will actually be used; a leap
      // day is valid in one of these years and not the other.
      if (thisYear >= cutoff) {
        if (new Date(thisYear).getUTCMonth() !== month) continue;
        timestamp = thisYear;
      } else if (nextYear <= todayStamp + NO_YEAR_LOOKAHEAD_DAYS * DAY_MS) {
        if (new Date(nextYear).getUTCMonth() !== month) continue;
        timestamp = nextYear;
      } else {
        continue;
      }
    }

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

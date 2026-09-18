import { describe, expect, it } from "vitest";

import { classifyEvents, monthIndex, PAST_EVENT_GRACE_DAYS } from "./event-lifecycle";
import type { EventItem } from "./events";

/**
 * Date logic is where this quietly goes wrong, and the failure is invisible:
 * an event on the wrong side of "today" still renders, still looks like a real
 * card, and nobody notices until a guest turns up to something that finished.
 * So the cases below are the boundaries and the awkward inputs, not the happy
 * path.
 *
 * "Now" is fixed in every test. A date test that reads the real clock passes
 * for eleven months and fails on the twelfth.
 */

/** Noon UTC on 18 September 2026, which is morning in California. */
const NOW = new Date("2026-09-18T19:00:00Z");

function ev(month: string, day: string, title = "An event", year = ""): EventItem {
  return { month, day, title, description: "", url: "", year };
}

describe("monthIndex", () => {
  it("reads the shapes people actually type", () => {
    expect(monthIndex("APRIL")).toBe(3);
    expect(monthIndex("april")).toBe(3);
    expect(monthIndex("Apr")).toBe(3);
    expect(monthIndex("Sept")).toBe(8);
    expect(monthIndex("  June  ")).toBe(5);
    expect(monthIndex("Dec.")).toBe(11);
  });

  it("refuses what it cannot place, rather than guessing", () => {
    expect(monthIndex("")).toBeNull();
    expect(monthIndex("Smarch")).toBeNull();
    // Two letters is ambiguous: Ma could be March or May.
    expect(monthIndex("Ma")).toBeNull();
  });
});

describe("classifyEvents", () => {
  it("marks a future date upcoming and a recent one past", () => {
    const rows = [ev("OCTOBER", "3", "Future"), ev("SEPTEMBER", "1", "Just gone")];
    const out = classifyEvents(rows, NOW);
    expect(out.map((e) => [e.title, e.state])).toEqual([
      ["Future", "upcoming"],
      ["Just gone", "past"],
    ]);
  });

  it("treats today as upcoming, because the event has not happened yet", () => {
    const out = classifyEvents([ev("SEPTEMBER", "18", "Tonight")], NOW);
    expect(out[0].state).toBe("upcoming");
  });

  it("keeps an event for the full grace window and drops it the day after", () => {
    // 60 days before 18 Sep 2026 is 20 July 2026.
    expect(PAST_EVENT_GRACE_DAYS).toBe(60);
    const justInside = classifyEvents([ev("JULY", "20", "Edge")], NOW);
    expect(justInside).toHaveLength(1);
    expect(justInside[0].state).toBe("past");

    const justOutside = classifyEvents([ev("JULY", "19", "Too old")], NOW);
    expect(justOutside).toHaveLength(0);
  });

  it("orders upcoming soonest first, then past most recent first", () => {
    const rows = [
      ev("SEPTEMBER", "5", "Past older"),
      ev("DECEMBER", "1", "Upcoming later"),
      ev("SEPTEMBER", "16", "Past recent"),
      ev("OCTOBER", "2", "Upcoming sooner"),
    ];
    expect(classifyEvents(rows, NOW).map((e) => e.title)).toEqual([
      "Upcoming sooner",
      "Upcoming later",
      "Past recent",
      "Past older",
    ]);
  });

  describe("the year", () => {
    it("uses the Year column when it is filled in", () => {
      const out = classifyEvents([ev("JANUARY", "10", "Next January", "2027")], NOW);
      expect(out).toHaveLength(1);
      expect(out[0].state).toBe("upcoming");
    });

    it("reads a blank year as the current year", () => {
      // April 2026 is nearly six months past, so it is gone, not resurrected
      // as April 2027. This is the Global Fork stale-row case exactly.
      expect(classifyEvents([ev("APRIL", "1", "Stale")], NOW)).toHaveLength(0);
    });

    it("does not roll a long-past date forward into next year", () => {
      const out = classifyEvents([ev("MAY", "1", "Also stale")], NOW);
      expect(out).toHaveLength(0);
    });

    it("lets a Year rescue a January event entered in December", () => {
      const december = new Date("2026-12-20T19:00:00Z");
      expect(classifyEvents([ev("JANUARY", "10", "No year")], december)).toHaveLength(0);
      const withYear = classifyEvents([ev("JANUARY", "10", "With year", "2027")], december);
      expect(withYear).toHaveLength(1);
      expect(withYear[0].state).toBe("upcoming");
    });
  });

  describe("rows it refuses", () => {
    it("drops a month it cannot read rather than shifting the date", () => {
      expect(classifyEvents([ev("Smarch", "3")], NOW)).toHaveLength(0);
    });

    it("drops a day that is not a number", () => {
      expect(classifyEvents([ev("OCTOBER", "the 3rd")], NOW)).toHaveLength(0);
      expect(classifyEvents([ev("OCTOBER", "")], NOW)).toHaveLength(0);
    });

    it("drops an impossible day instead of sliding it into the next month", () => {
      // Date.UTC would turn 30 February into 1 or 2 March without this guard.
      expect(classifyEvents([ev("FEBRUARY", "30", "", "2027")], NOW)).toHaveLength(0);
      expect(classifyEvents([ev("OCTOBER", "32")], NOW)).toHaveLength(0);
    });

    it("drops a year that is not a year", () => {
      expect(classifyEvents([ev("OCTOBER", "3", "Typo", "20267")], NOW)).toHaveLength(0);
      expect(classifyEvents([ev("OCTOBER", "3", "Typo", "next")], NOW)).toHaveLength(0);
    });

    it("accepts a leap day in a leap year and refuses it otherwise", () => {
      expect(classifyEvents([ev("FEBRUARY", "29", "Leap", "2028")], NOW)).toHaveLength(1);
      expect(classifyEvents([ev("FEBRUARY", "29", "Not leap", "2027")], NOW)).toHaveLength(0);
    });
  });

  it("uses California's day, not the visitor's", () => {
    // 02:00 UTC on 19 September is 19:00 on the 18th in California. A naive
    // implementation reading the UTC date would call the 18th finished while
    // the doors are still open.
    const utcIsThe19th = new Date("2026-09-19T02:00:00Z");
    expect(utcIsThe19th.getUTCDate()).toBe(19);
    const out = classifyEvents([ev("SEPTEMBER", "18", "Tonight")], utcIsThe19th);
    expect(out[0].state).toBe("upcoming");
  });
});

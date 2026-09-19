import { describe, expect, it } from "vitest";

import {
  classifyEvents,
  monthIndex,
  NO_YEAR_LOOKAHEAD_DAYS,
  PAST_EVENT_GRACE_DAYS,
} from "./event-lifecycle";
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

  it("reads a month typed as a number, which is what the column invites", () => {
    // The column is headed "Month", so 10 for October is a fair reading of it.
    // Three real rows were lost to this on the day the STATION8 sheet went live.
    expect(monthIndex("1")).toBe(0);
    expect(monthIndex("01")).toBe(0);
    expect(monthIndex("10")).toBe(9);
    expect(monthIndex("12")).toBe(11);
    expect(monthIndex(" 9 ")).toBe(8);
  });

  it("refuses a number that is not a month", () => {
    expect(monthIndex("0")).toBeNull();
    expect(monthIndex("13")).toBeNull();
    expect(monthIndex("2026")).toBeNull();
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

    it("reads a blank year as this year when the date still makes sense", () => {
      const out = classifyEvents([ev("NOVEMBER", "14", "Later this year")], NOW);
      expect(out[0].state).toBe("upcoming");
    });

    it("drops a stale row rather than resurrecting it as next year", () => {
      // April 2026 is nearly six months past. Next April is nearly seven months
      // ahead, well outside the lookahead, so the row is stale and goes. This
      // is the Global Fork case exactly.
      expect(classifyEvents([ev("APRIL", "1", "Stale")], NOW)).toHaveLength(0);
      expect(classifyEvents([ev("MAY", "1", "Also stale")], NOW)).toHaveLength(0);
    });

    it("rolls a January event typed in December into next year, with no Year column", () => {
      // The case that makes the naive "blank means this year" rule wrong: in
      // December, January is twenty days away, not eleven months behind.
      const december = new Date("2026-12-20T19:00:00Z");
      const out = classifyEvents([ev("JANUARY", "10", "Winter Market")], december);
      expect(out).toHaveLength(1);
      expect(out[0].state).toBe("upcoming");
      expect(new Date(out[0].timestamp).getUTCFullYear()).toBe(2027);
    });

    it("still drops a genuinely stale row when read in December", () => {
      // June is six months behind and next June is five and a half months
      // ahead, outside the window, so the wrap-forward does not rescue it.
      const december = new Date("2026-12-20T19:00:00Z");
      expect(classifyEvents([ev("JUNE", "5", "Old")], december)).toHaveLength(0);
    });

    it("draws the wrap-forward line at the lookahead window", () => {
      expect(NO_YEAR_LOOKAHEAD_DAYS).toBe(120);
      // 20 Dec 2026 + 120 days is 19 April 2027.
      const december = new Date("2026-12-20T19:00:00Z");
      expect(classifyEvents([ev("APRIL", "19", "Just inside")], december)).toHaveLength(1);
      expect(classifyEvents([ev("APRIL", "20", "Just outside")], december)).toHaveLength(0);
    });

    it("an explicit Year always wins over the inference", () => {
      // April with no year is stale in September; April 2027 stated outright is
      // a real future event and must survive.
      expect(classifyEvents([ev("APRIL", "1", "Stale")], NOW)).toHaveLength(0);
      const stated = classifyEvents([ev("APRIL", "1", "Planned", "2027")], NOW);
      expect(stated).toHaveLength(1);
      expect(stated[0].state).toBe("upcoming");
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
      expect(classifyEvents([ev("FEBRUARY", "30", "No year either")], NOW)).toHaveLength(0);
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

  it("places the rows the live STATION8 sheet actually contains", () => {
    // 10/1, 11/2 and 12/3 as typed, with no Year: October, November and
    // December of this year, all ahead of 18 September, all upcoming and in
    // date order.
    const rows = [ev("10", "1", "October one"), ev("11", "2", "November two"), ev("12", "3", "December three")];
    const out = classifyEvents(rows, NOW);
    expect(out.map((e) => [e.title, e.state])).toEqual([
      ["October one", "upcoming"],
      ["November two", "upcoming"],
      ["December three", "upcoming"],
    ]);
    // And the card prints a month name, not the digits that were typed.
    expect(out.map((e) => e.monthLabel)).toEqual(["OCTOBER", "NOVEMBER", "DECEMBER"]);
  });

  it("prints the same month label however it was typed", () => {
    const rows = [ev("10", "1", "digits"), ev("Oct", "2", "short"), ev("OCTOBER", "3", "long")];
    expect(classifyEvents(rows, NOW).map((e) => e.monthLabel)).toEqual([
      "OCTOBER",
      "OCTOBER",
      "OCTOBER",
    ]);
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

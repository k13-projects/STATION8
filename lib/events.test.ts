import { describe, expect, it } from "vitest";

import { normalizeUrl, parseEventsCSV, SHEET_CSV_URL } from "./events";

/**
 * This parser sits between a spreadsheet the client types into and the live
 * site. Nobody reviews what they type, there is no validation on the sheet, and
 * a bad row reaches production the moment it is saved. So the cases that matter
 * are not the tidy ones, they are the ones a person actually produces: a comma
 * inside a description, a bare domain in the URL column, a row abandoned
 * halfway, and the blank rows every spreadsheet carries under the last entry.
 */

const HEADER = "Month,Day,Title,Description,URL";

describe("parseEventsCSV", () => {
  it("reads a plain row", () => {
    const rows = parseEventsCSV(`${HEADER}\nOCTOBER,3,Opening Week,Tastings all day,https://example.com`);
    expect(rows).toEqual([
      {
        month: "OCTOBER",
        day: "3",
        title: "Opening Week",
        description: "Tastings all day",
        url: "https://example.com",
      },
    ]);
  });

  it("keeps a comma that lives inside quotes", () => {
    const rows = parseEventsCSV(`${HEADER}\nOCTOBER,3,Opening Week,"Tastings, all day, every stall",`);
    expect(rows[0].description).toBe("Tastings, all day, every stall");
  });

  it("drops the header row", () => {
    expect(parseEventsCSV(HEADER)).toEqual([]);
  });

  it("skips a row missing month, day or title", () => {
    const csv = [
      HEADER,
      "NOVEMBER,,No day so it is not an event,,",
      ",14,No month,,",
      "NOVEMBER,14,,No title,",
      "NOVEMBER,14,Kept,,",
    ].join("\n");
    const rows = parseEventsCSV(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe("Kept");
  });

  it("ignores the trailing blank rows every sheet carries", () => {
    const csv = `${HEADER}\nOCTOBER,3,Opening Week,,\n,,,,\n,,,,\n`;
    expect(parseEventsCSV(csv)).toHaveLength(1);
  });

  it("survives Windows line endings, which is what a Google export can send", () => {
    const rows = parseEventsCSV(`${HEADER}\r\nOCTOBER,3,Opening Week,,\r\n`);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe("Opening Week");
  });

  it("returns nothing for an empty sheet rather than throwing", () => {
    expect(parseEventsCSV("")).toEqual([]);
  });

  it("tolerates a short row that still has the three fields that matter", () => {
    const rows = parseEventsCSV(`${HEADER}\nOCTOBER,3,Opening Week`);
    expect(rows[0]).toMatchObject({ title: "Opening Week", description: "", url: "" });
  });
});

describe("normalizeUrl", () => {
  it("leaves a real URL alone", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com");
    expect(normalizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("adds a protocol to a bare domain, which is what people paste", () => {
    expect(normalizeUrl("www.example.com")).toBe("https://www.example.com");
  });

  it("trims the stray space a spreadsheet cell collects", () => {
    expect(normalizeUrl("  www.example.com  ")).toBe("https://www.example.com");
  });

  it("gives back an empty string for an empty cell, so no link is rendered", () => {
    expect(normalizeUrl("")).toBe("");
    expect(normalizeUrl("   ")).toBe("");
  });
});

describe("SHEET_CSV_URL", () => {
  /**
   * Guards the two ways this silently stops working: someone publishes the
   * whole document instead of one tab (no gid, and you get the first tab
   * whatever it holds), or publishes it in a format that is not CSV.
   */
  it("points at a single published tab, as CSV", () => {
    expect(SHEET_CSV_URL).toContain("/pub?");
    expect(SHEET_CSV_URL).toContain("gid=");
    expect(SHEET_CSV_URL).toContain("single=true");
    expect(SHEET_CSV_URL).toContain("output=csv");
  });
});

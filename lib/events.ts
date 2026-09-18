/**
 * Events data source.
 *
 * The house pattern for a food hall events calendar, the same one Miramar and
 * Global Fork already run: the client keeps the event list in a Google Sheet
 * that is "published to web" as CSV, the site fetches that CSV in the browser
 * on load, and an edit in the sheet is on the site the moment the next visitor
 * loads the page. No CMS, no rebuild, no deploy, and nothing for the client to
 * log into beyond a spreadsheet they already know how to use.
 *
 * Added here 2026-09-18, after Lorena asked for "the link to edit the events"
 * for STATION8 and the honest answer was that this site never got one.
 *
 * Columns, row 1 is the header: Month | Day | Title | Description | URL
 *
 * Deliberately client-side rather than a server fetch with a short revalidate:
 * immediacy is the whole promise of this pattern. The client edits the sheet,
 * refreshes the page, and sees it. A cache window, however short, turns that
 * into "wait and see" and the next question is always whether it worked.
 *
 * FALLBACK, and how it differs from the other two sites on purpose: when the
 * sheet is empty or unreachable, this site shows nothing and says so. Miramar
 * and Global Fork both fall back to a hardcoded list of sample events, and on
 * 2026-09-18 that was actively lying on one of them: Global Fork's own sheet
 * carried Trivia Night on 1 April, Live Music on 1 May and Taste of Italy on
 * 5 June, all "Coming Soon", all still on the live site in September. Inventing
 * events is worse than having none, so there is no sample list here to leak.
 */

export type EventItem = {
  month: string;
  day: string;
  title: string;
  description?: string;
  url?: string;
};

/**
 * The published-to-web CSV for STATION8's events tab. Kazim published it and
 * sent the URL on 2026-09-18; it is shared with Lorena, who edits it directly.
 *
 * `gid` selects the tab, so if this sheet ever grows a tab per venue, each site
 * points at its own gid and they never collide. Publishing the whole document
 * instead of a single tab silently gives you the first tab only, which is the
 * trap worth knowing about here.
 *
 * The sheet is the site. When it is empty, as it is today, the section says so
 * rather than inventing anything to fill the space.
 */
export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlm-t9adUdMm97w0IyXmoAWxGJPv7GrdzMMxjDUFg2yMR45NM91dShmqQCLAei_ksm2dchqlWC1bh9/pub?gid=0&single=true&output=csv";

/** Split one CSV line into trimmed fields, honoring quoted commas. */
function parseCSVLine(line: string): string[] {
  const cols: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      cols.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());
  return cols;
}

/**
 * Parse the published-sheet CSV into events. Skips the header row and any row
 * missing Month, Day or Title, because a half-filled row in a spreadsheet is
 * someone mid-thought, not an event.
 */
export function parseEventsCSV(csv: string): EventItem[] {
  const lines = csv.split(/\r?\n/).slice(1);
  return lines
    .map((line): EventItem | null => {
      const cols = parseCSVLine(line);
      if (cols.length >= 3 && cols[0] && cols[1] && cols[2]) {
        return {
          month: cols[0],
          day: cols[1],
          title: cols[2],
          description: cols[3] || "",
          url: cols[4] || "",
        };
      }
      return null;
    })
    .filter((e): e is EventItem => e !== null);
}

/** Ensure a sheet-provided URL has a protocol so the link works. */
export function normalizeUrl(url: string): string {
  const u = url.trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

/**
 * Fetch and parse the live events sheet. Throws on network or HTTP failure so
 * the caller can decide what to show; here that means showing nothing.
 */
export async function fetchEvents(): Promise<EventItem[]> {
  if (!SHEET_CSV_URL) return [];
  const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Events sheet fetch failed: ${res.status}`);
  return parseEventsCSV(await res.text());
}

# Lessons

## Events come from a Google Sheet the client edits (Kazim, 2026-09-18)

This is the house standard for a food hall events calendar, not a STATION8 invention: Miramar
and Global Fork already run it. The client keeps the events in a Google Sheet shared with them,
the tab is published to web as CSV, and the site fetches that CSV in the browser on load, so an
edit in the sheet is live at the next page load with no rebuild and no deploy.

**Why it matters here:** Lorena asked for "the link to edit the events" on 18 September and this
site had never been given one, even though two sibling sites had. It was not a new request, it
was a gap.

**How to apply:** `lib/events.ts` + `features/events/EventsList.tsx` are the implementation, and
the only thing missing is `SHEET_CSV_URL`. Publishing a sheet to the web needs Kazim's own Google
account, so that step is his; everything else is code. Full spec, including the setup steps and
the column shape: `K13-WarRoom/starter-kit/EVENTS_SHEET.md`.

## Never fall back to sample events (2026-09-18)

This site shipped with three placeholder events hardcoded as a fallback, dated in June. They went
live at launch and were still there on 18 September, on a site for a market that has not opened,
advertising "Opening Week, Tasting Pass" on 4 June. A guest could have planned around them.

**Why:** nobody reported it for three months because a fake event is indistinguishable from a
real one. A broken button announces itself; invented content does not. It is the one bug class
that is invisible to the client, to us, and to every test.

**How to apply:** when the sheet is empty or unreachable, say so. Keep the section on the page,
because the nav links to it, and give it a line that is true. Applies beyond events: any
placeholder written to make a design reviewable is a liability the moment it ships.

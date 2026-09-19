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

## Reach for the primitive that already exists (2026-09-18)

**What happened.** The events empty state shipped with a follow button nobody could read: sand-stone
text inside a 35% sand-stone border, on the olive ground. Its only legible state was hover. Kazim
saw it on the live page and said so.

**The cause is not colour choice.** `design-system/primitives/Button.tsx` already had `variant="primary"`:
filled sand-stone, dark-bark text, a distinct hover to `--color-may`. Exactly the fix he asked for,
sitting in the repo, already used by the Go Now button on the same page. The events button was
written by hand as an `<a>` with ad-hoc classes, so it inherited none of it and drifted immediately.

**How to apply.** Before styling a control, look for the primitive. A hand-rolled one starts life
slightly different and gets further away with every change, and the difference is invisible to
tests because nothing is broken, only wrong. The same evening, Global Fork's footer had
`https://instagram.com/` hardcoded instead of reading `siteConfig`, so it stayed broken even after
the handle was set: the identical mistake in a different costume.

## A control whose only readable state is hover is not readable (2026-09-18)

Ghost buttons, a faint outline in the text colour at 25 to 35 percent, look refined in a mock and
disappear on a real screen at real brightness. Hover does not rescue them: it does not exist on a
phone, and on a desktop it requires the visitor to find the thing first.

**How to apply.** Default state carries the contrast. If a design wants a quiet control, make it
quiet with size or weight, not by draining the contrast out of it. When a button needs a hover,
hover should be a *change*, not the moment the button appears. Kazim's own instruction, and the
clearest statement of it: "use the hover state as default and find a different hover state."

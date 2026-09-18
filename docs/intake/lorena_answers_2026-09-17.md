# Lorena's answers, 17 September 2026, and what we did with them

Her reply to the combined Tiger email
(`K13-WarRoom/docs/TIGER_SIGNOFF_EMAIL_2026-09-17_sent-to-client.html`), received 17 Sep 2026
17:41 on the thread "Tiger Hospitality Sites: Status Update and Open Items", Eren on cc. This is
the STATION8 part. The Cosmos part is in that repo's own intake folder.

Supersedes the address and hours questions in `lorena_open_items_2026-09-14.md`.

---

## What she answered

**Address: 9165 Theatre District Dr, La Jolla, CA 92037.**

This is not the address we asked about. We asked her to confirm **9145 Scholars Drive South**,
which is what Eren gave us on 2025-11-20 and what the 14 Sep open-items file carries. She answered
with a different street entirely. Hers is the one to trust: it is the address Cosmos already
carries for the same hall, and it is the Theater District, which is where every piece of copy on
this site says the market is. The Scholars Drive address is treated as superseded, not as a
conflict to resolve.

**Hours: 7:00 AM to 9:00 PM, tentative.** Confirms what the site already said. "Tentative" is
her word and is why the badge below matters.

**"Please in Where we are part: add a Coming Soon badge because it currently seems like its open
now."** Her own reading of the live site, and she is right.

---

## What we changed

**DONE. The address is published in all five places it appears**, and two of them were worse than
wrong, they were placeholders that had gone live:

| Where | Was | Now |
|---|---|---|
| `app/page.tsx` Visit Us card | `La Jolla, CA 92037`, no street at all | `9165 Theatre District Dr` + the city line |
| `app/layout.tsx` Restaurant structured data | `streetAddress: "[Street Address]"` | the real street |
| `app/privacy/page.tsx` contact block | `[Street Address]` / `La Jolla, CA [ZIP]` | the real address |
| `app/terms/page.tsx` contact block | `[Street Address]` / `La Jolla, CA [ZIP]` | the real address |
| `app/page.tsx` Go Now button | Apple Maps search for the venue name | the address itself |

The two legal pages are the ones that sting: a privacy page that prints `[Street Address]` where
it tells a resident how to reach the business is the page a regulator reads. They had nothing to
fill in until she answered, which is why they shipped that way, and they are filled in now.

**DONE. The Coming Soon badge is in the Where We Are section**, above the hours, in the house
mono label style on the olive token with a dot. The hours line changed with it, from "Our market
is open daily from 7:00 am to 9:00 pm" to "When we open, the market runs daily from 7:00 am to
9:00 pm". The badge alone would not have fixed her complaint: the sentence was the thing claiming
the market is open, in the present tense, and a badge beside a present-tense sentence is an
argument with itself.

Checked at 1280 and at 375. No horizontal overflow, the badge holds its own line, the exterior
photograph still fills the right-hand column.

---

## Still owed

| What | Who | Note |
|---|---|---|
| The opening date | Lorena | Asked 17 Sep, not answered. The badge stays until there is one, and the hours stay in the future tense with it |
| Whether the Google listing is ours to complete or theirs | Lorena or Eren | The address and hours exist now, which was the blocker |

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home (P0 scaffold)", () => {
  test("renders the tagline and sub-copy", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Where Global is Local/i })).toBeVisible();
    await expect(page.getByText(/Cuisine from Around the World/i)).toBeVisible();
  });

  test("has no serious accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious).toEqual([]);
  });
});

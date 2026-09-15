import { chromium } from "playwright";
import { mkdirSync } from "fs";

mkdirSync("shots", { recursive: true });

async function wheelTo(page, frac) {
  const target = await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return f * max;
  }, frac);
  for (let i = 0; i < 80; i++) {
    const cur = await page.evaluate(() => window.scrollY);
    const diff = target - cur;
    if (Math.abs(diff) < 40) break;
    await page.mouse.wheel(0, Math.max(-2500, Math.min(2500, diff)));
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(1400);
}

const browser = await chromium.launch({ channel: "msedge", headless: true });

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "load" });
await page.waitForTimeout(5000);
await page.screenshot({ path: "shots/1-hero.png" });

await wheelTo(page, 0.2);
await page.screenshot({ path: "shots/2-about.png" });

await wheelTo(page, 0.42);
await page.screenshot({ path: "shots/3-stack.png" });

await wheelTo(page, 0.6);
await page.screenshot({ path: "shots/4-projects.png" });

try {
  await page.locator("article").first().hover({ timeout: 3000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "shots/5-projects-hover.png" });
} catch {}

await wheelTo(page, 0.99);
await page.screenshot({ path: "shots/6-contact.png" });
await page.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:4173", { waitUntil: "load" });
await mobile.waitForTimeout(5000);
await mobile.screenshot({ path: "shots/7-mobile-hero.png" });
await wheelTo(mobile, 0.45);
await mobile.screenshot({ path: "shots/8-mobile-mid.png" });
await mobile.close();

await browser.close();
console.log("screenshots done");

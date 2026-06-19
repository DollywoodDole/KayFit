const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone SE'], viewport: { width: 375, height: 667 } });
  const page = await ctx.newPage();
  await page.goto('https://kayfit.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: 'screenshots/fix-01-hero.png' });
  console.log('hero shot');

  const btn = await page.$('#hamburger');
  await btn.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/fix-02-hamburger.png' });
  console.log('hamburger shot');

  await browser.close();
  console.log('done');
})();

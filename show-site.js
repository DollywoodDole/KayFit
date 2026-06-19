const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://kayfit.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/desktop-hero.png' });
  console.log('hero');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/desktop-contact.png' });
  console.log('contact/footer');

  await page.screenshot({ path: 'screenshots/desktop-full.png', fullPage: true });
  console.log('full page');

  await browser.close();
})();

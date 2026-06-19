const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://kayfit.vercel.app', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  fs.mkdirSync('C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots', { recursive: true });

  await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-hero.png' });
  console.log('hero');

  const stats = await page.$('.stats-bar');
  if (stats) {
    await stats.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-stats.png' });
    console.log('stats');
  }

  const forSection = await page.$('#for');
  if (forSection) {
    await forSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-for.png' });
    console.log('for');
  }

  const pricing = await page.$('#pricing');
  if (pricing) {
    await pricing.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-pricing.png' });
    console.log('pricing');
  }

  const contact = await page.$('#contact');
  if (contact) {
    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-contact.png' });
    console.log('contact');
  }

  await page.screenshot({ path: 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots/revamp-full.png', fullPage: true });
  console.log('full page done');

  await browser.close();
})();

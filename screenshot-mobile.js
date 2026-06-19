const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const iphone = devices['iPhone SE'];
  const context = await browser.newContext({
    ...iphone,
    viewport: { width: 375, height: 667 }
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/dalto/OneDrive/Desktop/KayFit/screenshots';
  fs.mkdirSync(outDir, { recursive: true });

  await page.goto('https://kayfit.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Full page shot
  await page.screenshot({ path: outDir + '/00-fullpage.png', fullPage: true });

  // Scroll to each section and screenshot viewport
  const sections = [
    { id: 'top',      selector: 'nav',       name: '01-nav-hero' },
    { id: 'marquee',  selector: '.marquee-bar', name: '02-marquee' },
    { id: 'about',    selector: '#about',    name: '03-about' },
    { id: 'for',      selector: '#for',      name: '04-who-its-for' },
    { id: 'program',  selector: '#program',  name: '05-program-pillars' },
    { id: 'weeks',    selector: '#weeks',    name: '06-12-week-grid' },
    { id: 'photos',   selector: '#photos',   name: '07-photo-strip' },
    { id: 'included', selector: '#included', name: '08-included' },
    { id: 'pricing',  selector: '#pricing',  name: '09-pricing' },
    { id: 'faq',      selector: '#faq',      name: '10-faq' },
    { id: 'cta',      selector: '#cta',      name: '11-cta' },
    { id: 'footer',   selector: 'footer',    name: '12-footer' },
  ];

  for (const s of sections) {
    const el = await page.$(s.selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: outDir + '/' + s.name + '.png' });
      console.log('Shot:', s.name);
    }
  }

  // Also test hamburger menu
  const hamburger = await page.$('#hamburger');
  if (hamburger) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await hamburger.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: outDir + '/13-hamburger-open.png' });
    console.log('Shot: hamburger menu open');
  }

  await browser.close();
  console.log('Done. Screenshots in:', outDir);
})();

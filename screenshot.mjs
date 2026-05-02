import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

(async () => {
  const dir = 'businesses/turnkey/turnkey-web/sites/estate-mate/screenshots';
  mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-web-security'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 }
  });

  const page = await browser.newPage();
  console.log('Loading site...');

  // Use 'load' instead of networkidle0 to avoid CDN stall
  await page.goto('http://localhost:8765', { waitUntil: 'load', timeout: 15000 });

  // Give JS + fonts time to initialize
  await new Promise(r => setTimeout(r, 2500));
  console.log('Ready, taking shots...');

  await page.screenshot({ path: `${dir}/hero.png`, fullPage: false });
  console.log('shot hero.png');

  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });
  console.log('shot full-page.png');

  await page.evaluate(() => document.getElementById('services').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${dir}/services.png`, fullPage: false });
  console.log('shot services.png');

  await page.evaluate(() => document.getElementById('why-bar').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${dir}/why-bar.png`, fullPage: false });
  console.log('shot why-bar.png');

  await page.evaluate(() => document.getElementById('stats').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${dir}/stats.png`, fullPage: false });
  console.log('shot stats.png');

  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${dir}/contact.png`, fullPage: false });
  console.log('shot contact.png');

  await browser.close();
  console.log('All screenshots saved!');
})();

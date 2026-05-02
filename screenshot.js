import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = 'http://localhost:8765';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }
});

const page = await browser.newPage();
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

// Wait for fonts + animations
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2500));

// Hero shot
await page.screenshot({ path: join(__dirname, 'screenshots', 'hero.png'), fullPage: false });
console.log('✓ hero.png');

// Full page shot
await page.screenshot({ path: join(__dirname, 'screenshots', 'full.png'), fullPage: true });
console.log('✓ full.png');

// Services section
await page.evaluate(() => document.getElementById('services').scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: join(__dirname, 'screenshots', 'services.png'), fullPage: false });
console.log('✓ services.png');

// Stats
await page.evaluate(() => document.getElementById('stats').scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: join(__dirname, 'screenshots', 'stats.png'), fullPage: false });
console.log('✓ stats.png');

// Contact
await page.evaluate(() => document.getElementById('contact').scrollIntoView({ behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: join(__dirname, 'screenshots', 'contact.png'), fullPage: false });
console.log('✓ contact.png');

await browser.close();
console.log('\nAll screenshots saved to /screenshots/');

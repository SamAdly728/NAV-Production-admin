const fs = require('fs');
const path = require('path');

// This script uses Puppeteer to render docs/summary.html to docs/NAV-Production-summary.pdf
// Usage:
// 1) npm install puppeteer --save-dev
// 2) node scripts/generate_pdf.js

(async ()=>{
  try {
    const puppeteer = require('puppeteer');
    const htmlPath = path.join(__dirname, '..', 'docs', 'summary.html');
    const out = path.join(__dirname, '..', 'docs', 'NAV-Production-summary.pdf');
    if (!fs.existsSync(htmlPath)) throw new Error('HTML file not found: ' + htmlPath);

    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.pdf({ path: out, format: 'A4', printBackground: true });
    await browser.close();
    console.log('PDF written to', out);
  } catch (e) {
    console.error('Failed to generate PDF:', e.message || e);
    process.exit(1);
  }
})();
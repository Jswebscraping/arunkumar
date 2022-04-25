const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  const proxy = 'https://api.getproxylist.com/proxy';
  const url = 'https://whatismyipaddress.com/';
  const pageUrl = `${proxy}https://whatismyipaddress.com/`;

  await page.goto(pageUrl);
}

run();

//const { use } = require('express/lib/application');
const puppeteer = require('puppeteer');

//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({headless:false,executablePath:'C:/Users/user/AppData/Local/Google/Chrome/Application/chrome.exe',userDataDir:'C:/Users/user/AppData/Local/Google/Chrome/User Data/Default'})
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://bot.sannysoft.com')
  await page.screenshot({ path: 'print.png', fullPage: true })
  await browser.close()
})()
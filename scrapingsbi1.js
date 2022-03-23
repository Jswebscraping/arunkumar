const puppeteer = require("puppeteer");
const fs = require("fs/promises");
async function read(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
    await page.goto("https://www.nseindia.com/get-quotes/equity?symbol=SBIN",{waitUntil: 'networkidle2',timeout:0});
    
    const Header=[]
    const Index=[]
    const Value=[]
    const V=[]
        
            var p = await page.$eval('#subtab-equity > div:nth-child(1) > div.mt-3.py-3 > div > h2',h2 => h2.innerText);
            Header.push(p)
            var header = await page.$eval('#securityInfo thead>tr',tr =>tr.innerText);
            Index.push(header)
            var dis = await page.$eval('#securityInfo tbody>tr',tr =>tr.innerText);
            Value.push(dis)
            V.push(Header+"\n"+Index+"\n"+Value)
            console.log({Header,Index,Value});
            await fs.writeFile("abcdefg.txt",V);
           
           
          
        await browser.close();
    }read()
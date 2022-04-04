const puppeteer = require('puppeteer');
const fs = require('fs')

async function main(){
    const browser = await puppeteer.launch({headless:false})
    const page=await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
     await page.goto('https://en.wikipedia.org/wiki/Zoobooks',{ waitUntil: 'networkidle2', timeout: 0 })
     const output=[]
     await page.waitForXPath('//*[@id="mw-content-text"]/div[1]/ul[1]/li[1]',{ waitUntil: 'networkidle2', timeout: 0 })
     const search = await page.$x('//*[@id="mw-content-text"]/div[1]/ul[1]/li[1]')
   ////  for(i=0;i<10;i++)
//{   

        const j = await page.evaluate(li=>li.innerText,search[0])
        console.log(j)
        output.push(j)
//}
        var result=JSON.stringify(output,null,2)
        fs.writeFile('output4.json',result, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("file created");
        })
    
     
     await browser.close();
}main()
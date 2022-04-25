
const puppeteer=require('puppeteer');
const fs = require('fs');



async function getpagedata(j, page) {
  try{
    await page.goto(j);
    await page.waitForXPath(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span`,{ waitUntil: 'networkidle2', timeout: 0 });
    const x = await page.$x(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span`)
    const title = await page.evaluate(title => title.textContent, x[0]);
    await page.waitForXPath(`//div[@class="_30jeq3 _16Jk6d"]`, { timeout: 0 })
    const y = await page.$x(`//div[@class="_30jeq3 _16Jk6d"]`);
    const price = await page.evaluate(div => div.textContent, y[0]);
    return ({title,price});
  }
  catch(e){
    await page.waitForXPath(`/html/body/div[1]/div/div[2]/div[3]/div[2]/div[2]/div/div[1]/h1/span`,{ waitUntil: 'networkidle2', timeout: 0 });
    const x = await page.$x(`/html/body/div[1]/div/div[2]/div[3]/div[2]/div[2]/div/div[1]/h1/span`)
    const title = await page.evaluate(title => title.textContent, x[0]);
    await page.waitForXPath(`//div[@class="_30jeq3 _16Jk6d"]`, { timeout: 0 })
    const y = await page.$x(`//div[@class="_30jeq3 _16Jk6d"]`);
    const price = await page.evaluate(div => div.textContent, y[0]);
    return ({title,price});
  }
}

async function geturl(page){
   
        await page.waitForXPath(`/html/body/div/div/div[3]/div[1]/div[2]/div/div/div/div/a`,{ waitUntil: 'networkidle2', timeout: 0 });
        const links = await page.$x(`/html/body/div/div/div[3]/div[1]/div[2]/div/div/div/div/a`);
        const link_urls = await page.evaluate((...links) => {
            return links.map(a => a.href);
            }, ...links);
   //  console.log(link_urls);
    //  await page.close();
return(link_urls);
}

async function input(){
    var value = fs.readFileSync("output1.csv", "utf8",'r');
    value = value.split(",");
   
    console.log(value);

    for (let i of value) {
       // var output = [];
       var f=[];
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/", { timeout: 0 })
        //await page.click('._2KpZ6l._2doB4z')
      
        await page.type('._3704LK',i)
        await page.keyboard.press('Enter')
        const link = await geturl(page);
       // link=link.split(",");
        
       // console.log(link);
      for (let j of link) {
            const details = await getpagedata(j, page)
           f.push(details)
        }
    
      console.log(f);
  
    var details = JSON.stringify(f, null, 2)
    fs.writeFile('flipkart.csv', details, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("file created");
    })
      await browser.close();
    }
}input()


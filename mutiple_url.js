const puppeteer = require('puppeteer');
 const fs = require('fs');
 try {
   (async () => {
    var value = fs.readFileSync("output1.csv", "utf8",'r');
    value = value.split(',');
    
   
    console.log(value);

    for (let i of value) {
        const x=['"x']
     if(i==x){
         console.log("welcome")
     }else{
         try{

     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.setViewport({ width: 1280, height: 800 })
     await page.goto(i,{ waitUntil: 'networkidle2', timeout:0 })
     const xpath='//*[@id="details"]/div[1]';
     await page.waitForXPath(xpath,{ timeout: 3000});
        const x = await page.$x(`/html/body/main/div[8]/div[2]/div[2]/div[1]/p[3]/strong[last()]`,{ timeout: 3000});
        const titl = await page.evaluate(titl => titl.textContent, x[0]);
        console.log(titl)
       
            await page.waitForXPath(xpath,{ waitUntil: 'networkidle2', timeout:3000 });
            // const y = await page.$x(`//*[@id="details"]/div[1]/p[3]/text()[position()>11]`)
             //const title = await page.evaluate(title => title.textContent, y);
             const details = await page.$x(`//strong[contains(text(),"Specifications")]//following-sibling::text()|//*[@id="details"]/div[1]/ul[1]/li`);
                const Detail_ = await page.evaluate((...details) => {
                    return details.map(title=>title.textContent);
                    }, ...details);
             
             console.log(Detail_)

      
    
    
     //await browser.close()
    
   
   await browser.close()}
   catch{
       console.log('no data')
     //  await browser.close()
   }
}}})();
   }
     catch (err) {
  console.error(err);
 
  
 } 

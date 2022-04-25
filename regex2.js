const puppeteer = require("puppeteer");
const fs = require("fs");

async function main(){
    try{
    const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.deonlinedrogist.nl/drogist/la-roche-posay-toleriane-bronzing-powder-12gr.htm",{ waitUntil: 'networkidle2', timeout: 30000});
   const output=[]

 
  for(k=10;k<14;k++)
    {
        try{
        
          
            await page.waitForXPath(`//*[@id="j-product-description__aia"]/div[${k}]`,{timeout: 30000});
            const search=await page.$x(`//*[@id="j-product-description__aia"]/div[${k}]`,{timeout: 30000});
            const result=await page.evaluate(div=>div.textContent,search[0]);
output.push(result)
        }
    
        catch(e)
        {
            break;
        }
    }
        
    console.log(output)

    
    await browser.close();
    }
    catch(e)
    {
        console.log("error",e)
    }

    
}
async function main1(){
    try{
    const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.deonlinedrogist.nl/drogist/la-roche-posay-lipikar-cleansing-oil-ap-400ml.htm",{ waitUntil: 'networkidle2', timeout: 30000});
   
    const output=[]
 
  for(k=26;k<29;k++)
    {
        try{
        
          
            await page.waitForXPath(`//*[@id="j-product-description__aia"]/div[${k}]`,{timeout: 30000});
            const search=await page.$x(`//*[@id="j-product-description__aia"]/div[${k}]`,{timeout: 30000});
            const result=await page.evaluate(div=>div.textContent,search[0]);
            output.push(result)

        }
    
        catch(e)
        {
            break;
        }
    }
        
    console.log(output)

    
    await browser.close();
    }
    catch(e)
    {
        console.log("error",e)
    }

    
}
async function load(){
    try{
        const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    const output=[]
    await page.goto("https://www.deonlinedrogist.nl/roche-posay-cicaplast-wasgel-p-88015.html",{ waitUntil: 'networkidle2', timeout: 30000});

    await page.waitForXPath('//*[@id="j-product-description__aia"]/b[5]');
    const search=await page.$x('//*[@id="j-product-description__aia"]/b[5]');
    
    const result=await page.evaluate(p=>p.textContent,search[0]);
    await page.waitForXPath('//*[@id="j-product-description__aia"]/text()[6]')
    const search1=await page.$x('//*[@id="j-product-description__aia"]/text()[6]')
      
    const result1=await page.evaluate(text=>text.textContent,search1[0]);
output.push(result,result1)
   console.log(output)
   await browser.close()
   
}
catch(e){
    console.log('error',e)
}
}load();
main();
main1();
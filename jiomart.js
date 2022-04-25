const puppeteer = require("puppeteer");
const fs = require("fs");

(async function main(){
    try{
    const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.jiomart.com/",{ waitUntil: 'networkidle2', timeout: 30000});
    await page.hover("#nav_link_2");
 
    page.click('#nav_link_61');
   const output=[]
    for(var i=1;i<4;i++)
    {
    const radio=await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[1]/div[2]/div/div/button[${i}]`,{timeout:0})
    await radio.click();
    
  for(k=1;k<20;k++)
    {
        try{
        
            await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${k}]/div/a/span[3]`, { timeout:3000 });
          
            const title_=await page.$x(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${k}]/div/a/span[3]`);
            
            const t= await page.evaluate(span=>span.innerText,title_[0]);
            await page.waitForXPath(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${k}]/div/span[2]/span`, { timeout: 3000 });
         
         
            const price_=await page.$x(`/html/body/div[1]/main/div[2]/div[2]/div[4]/div[2]/div/div/div/div/div/ol/li[${k}]/div/span[2]/span`)
            
            const p= await page.evaluate(span=>span.innerText,price_[0]);
             output.push({
                title:t,
                price:p
            })
            console.log('Title:',t,'\nPrice:',p);
    }
    
        catch(e)
        {
          //  break;
        }
    }
        
}
var result=JSON.stringify(output,null,2)
fs.writeFile('detailss.csv',result, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("file created");
})
   
    
    await browser.close();
    }
    catch(e)
    {
        console.log("error",e)
    }

    
})()
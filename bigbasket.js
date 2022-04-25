/**
 * @name Amazon search
 *
 * @desc Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
 */
 const puppeteer = require('puppeteer');
 const fs = require('fs');

 try {
   (async () => {
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.setViewport({ width: 1280, height: 800 })
     await page.goto('https://www.bigbasket.com',{ waitUntil: 'networkidle2', timeout: 0 })
     const searchbox = await page.waitForXPath('//*[@id="input"]');
     await searchbox.type('bevarages')
     await page.keyboard.press('Enter')
     const output=[]
     const output1=[]
     const output2=[]
     for(i=1;i<20;i++)
     {
     await page.waitForXPath('//div[@class="items"]//a[@class="ng-binding"]/@href',{ waitUntil: 'networkidle2', timeout: 0 });
        const search =await page.$x('//div[@class="items"]//a[@class="ng-binding"]/@href');
        var x = await page.evaluate(href=>href.textContent,search[i]);
        console.log('https://www.bigbasket.com'+x)
        output.push('https://www.bigbasket.com'+x)
     }
     for(k of output){

      await page.goto(k,{ waitUntil: 'networkidle2', timeout: 0 })
      const search1 =await page.$x('//div[@class="_2n4Dk"]//div[@class="_2yfKw"]//a')
      var q=await page.evaluate(a=>a.textContent,search1[0])
      const search2 =await page.$x('//div[@class="_2n4Dk"]//div[@class="_2yfKw"]//h1');
      var w=await page.evaluate(h1=>h1.textContent,search2[0])
      const search3 =await page.$x('//div[@class="_2yfKw"]//td[@class="IyLvo"]');
      var e=await page.evaluate(td=>td.textContent,search3[0])
      const result2 = await page.$x(`//*[@id="about_0"]/div[2]`);
      var r= await page.evaluate(h1 => h1.innerText, result2[0]);
      console.log('Brand:',q,'\ntitle:',w,'\nprice:',e,'\nDescription:',r)

     
      output1.push({
        Brand:q,
        title:w,
        price:e,
        Description:r
      })
      console.log(output1)
    }

    output2.push({
      1:output,
      2:output1
    })
    var result=JSON.stringify(output2,null,2)
    fs.writeFile('output5.json',result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("file created");
    })
   
     await browser.close()
    
   })()
 } catch (err) {
   //console.error(err)
 }
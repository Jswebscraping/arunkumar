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
     await page.goto('https://www.amazon.in',{ waitUntil: 'networkidle2', timeout: 0 })
     await page.type('.nav-input', 'moisturizer for face')
     await page.keyboard.press('Enter')
     await page.waitForSelector('.s-card-container',{ waitUntil: 'networkidle2', timeout: 0 });
     const search= await page.$$('.s-card-container');
     const output=[];
     const output1=[];
     for(i=0;i<10;i++)
     {
         var ab=await search[i].$eval('.a-link-normal',a=>a.href);
         
        output.push(ab)
         console.log(ab);
         
     }
     for (k of output){
         await page.goto(k)
        
         
         const product_title=await page.$eval('.product-title-word-break',span=>span.innerText);
         
         
         const brand=await page.$eval('.po-brand',span=>span.innerText);
         
         const MRP=await page.$eval('.a-offscreen',span=>span.innerText);
         
        const price=await page.$eval('.a-price-whole',span=>span.innerText)
         const image=await page.$eval('#landingImage',img=>img.src);
         const rating =await page.$eval('.a-icon-alt',span=>span.innerText);
         const item_details=await page.$eval('#feature-bullets',div=>div.innerText);
         console.log('url:',k,"\nproduct_title:",product_title,'\nMRP:',MRP,"\nBrand",brand,'\nPrice',price,'\n image-url',image,'\n Rating',rating,'\n product_details',item_details)
          output1.push({
            url:k,
            product_title:product_title,
            MRP:MRP,
            Brand:brand,
            Price:price,
             image_url:image,
             Rating:rating,
             product_details:item_details
          })
          var result=JSON.stringify(output1,null,2)
            fs.writeFile('outpuut.csv',result, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("file created");
            })
    
    
             
        }

     await browser.close()
    
   })()
 } catch (err) {
   console.error(err)
 }
const puppeteer =require('puppeteer');
const fs=require('fs');
(async function main(){
            try{
                const browser= await puppeteer.launch({headless:false})
                const page =await browser.newPage();
                await page.goto('https://news.ycombinator.com/',{ waitUntil: 'networkidle2', timeout: 0 });
                await page.waitForSelector('.athing',{ waitUntil: 'networkidle2', timeout: 0 });
                const search= await page.$$('.athing');
                const output=[];
                for(i=0;i<10;i++)
                {
                    var ab=await search[i].$eval('.titlelink',a=>a.href);
                   output.push(ab)
                    console.log(ab);
                    var result=JSON.stringify(output,null,2)
                    fs.writeFile('details.json',result, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("file created");
                    })
                }
            await browser.close();}
            catch(e)
                {
                    console.log("error",e);
                }
        })();
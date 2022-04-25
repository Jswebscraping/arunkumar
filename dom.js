const puppeteer =require('puppeteer');
const fs=require('fs');
(async function main(){
    const browser= await puppeteer.launch({headless:false})
                const page =await browser.newPage();
                await page.goto('https://news.ycombinator.com/', {waitUntil: 'networkidle2', timeout: 0});

                const x= await page.evaluate(() =>{
                    const info = document.querySelectorAll('.athing a');
                    let y=[]
                    let count=0
                   
                    info.forEach((tagg)=>{
                        if(count<11){
                            y.push("name:"+tagg.textContent)
                        y.push(tagg.href)
                        count++;
                        }
                    })
                      return{y} 
                });
                console.log(x);
                await browser.close();
            })();
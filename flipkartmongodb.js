const puppeteer =require('puppeteer');
const fs=require('fs/promises');
var MongoClient = require("mongodb").MongoClient;
var url="mongodb://localhost:27017";




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
    const title = await page.evaluate(span => span.textContent, x[0]);
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

(async function input(){
  try{
 const f=[];
  const browser=await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.flipkart.com',{ waitUntil: 'networkidle2', timeout: 0 })
  await page.type('._3704LK','mobile')
  await page.keyboard.press('Enter')
   
  const link = await geturl(page);
//  console.log(link_urls);
for (let j of link) {
  const details = await getpagedata(j, page)
 f.push(details)



  MongoClient.connect(url,function(err,db){

    if(err) throw err;
    
    var dbmy =db.db("seconddb");
 var mydata=({name:f})
    
    dbmy.collection('webusers').insertOne(mydata,function(err,res){
      if(err) throw err;
     
    
      db.close();
    });
  });}
  await browser.close();
}
catch(e){
  console.log("error", e);
}




})();

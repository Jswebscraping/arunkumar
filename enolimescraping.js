const puppeteer =require ('puppeteer');
const fs =require("fs/promises");

async function write(){
    const browser  = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://grofers.com/prn/eno-lemon-digestive-antacid/prid/10841',{waitUntil: 'networkidle2',timeout:0});

    const main = []
    var x = await page.$eval("#app > div > div > div:nth-child(5) > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2 > div:nth-child(1) > div.css-1dbjc4n.r-1777fci.r-1f720gc > div.css-1dbjc4n.r-14lw9ot.r-cdmcib.r-zl2h9q.r-1bymd8e.r-13qz1uu > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wtj0ep.r-c8eef1 > div",div=>div.innerText);
    
    var y = await page.$eval("#app > div > div > div:nth-child(5) > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2 > div:nth-child(1) > div.css-1dbjc4n.r-1777fci.r-1f720gc > div.css-1dbjc4n.r-14lw9ot.r-cdmcib.r-zl2h9q.r-1bymd8e.r-13qz1uu > div > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1wtj0ep.r-117bsoe > div > div",div=>div.innerText);
  
    var z = await page.$eval("#app > div > div > div:nth-child(5) > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2 > div:nth-child(3) > div:nth-child(1) > div ",div=>div.innerText)
   
    main.push({
        product:x,
        price:y,
        Description:z
    });
    
    console.log(main);
   // await fs.writeFile("output3.txt",main);
   var output2=JSON.stringify(main,null,2)
   fs.writeFile('outputt.json',output2, function (err) {
       if (err) {
           return console.log(err);
       }
       console.log("file created");
   })
    
    
    await browser.close();

}write()


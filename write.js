const puppeteer=require('puppeteer')
const fs = require('fs');

async function input(){
const dataa=("x,https://www.virginmegastore.ae/en/p/723594,https://www.virginmegastore.ae/en/p/199280,https://www.virginmegastore.ae/en/p/631025,https://www.virginmegastore.ae/en/p/723577,https://www.virginmegastore.ae/en/p/457004,https://www.virginmegastore.ae/en/p/766131,https://www.virginmegastore.ae/en/p/790688,x")
    console.log(dataa)
var result=JSON.stringify(dataa,null,2)
fs.writeFile('output1.csv',result, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("file created");
})
var data = fs.readFileSync("output1.csv", "utf8");
//data = data.split(',');
//for (let i in data) {
    //data[i] = data[i].split(",");
//}
console.log(data);
}input();
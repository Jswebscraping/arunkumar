
const regex1 = RegExp('1159*');
const str1 = 'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml';
let array1;

array1 = regex1.exec(str1)
  console.log('Found',array1[0]);
 

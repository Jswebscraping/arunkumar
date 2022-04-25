var MongoClient = require("mongodb").MongoClient;
var url="mongodb://localhost:27017";

MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbmy =db.db("firstdb");
  var mydata ={name:"siva",age:"28"}

  dbmy.collection('webusers').insertOne(mydata,function(err,res){
    if(err) throw err;
    console.log('document inserted')
    db.close();
  });
});

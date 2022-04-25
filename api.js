var request = require('request');
const fs = require('fs');
var options = {
  'method': 'GET',
  'url': 'http://jsonplaceholder.typicode.com/posts',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var output=response.body
  console.log(output);
  var details = JSON.stringify(output, null, 2)
  
   fs.writeFile('api.json', details, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("file created");
    })
});


// eslint-disable-next-line no-unused-vars
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path= require('path');

fs.readFile(path.join(__dirname,'text.txt'), 'utf8',function (err,data){
  if (err) throw err;
  console.log(data);
});

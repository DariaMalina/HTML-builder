const fs = require('fs');
const path= require('path');

fs.promises.readFile(path.join(__dirname, 'text.txt'), 'utf8').then(data => console.log(data));

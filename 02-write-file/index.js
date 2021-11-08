const process = require('process');
const fs = require('fs/promises');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
const rl = readline.createInterface({input, output});
process.stdout.write('Hello! Enter text:' + '\n');
rl.on('line', (answer) => {
  if (answer === 'exit') {
    rl.close();
    console.log('See you!');
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), answer + '\n', 'utf8',).catch(function (err) {
    if (err) throw err;
  });
});

process.on('.exit', () => {
  console.log('\n' + 'See you!');
});

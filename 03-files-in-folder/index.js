const path = require('path');
const fs = require('fs');
const pathSecretFolder = path.join(__dirname, 'secret-folder');
fs.promises.readdir(pathSecretFolder, {withFileTypes: true})
  .then(files => {
    let arrFileName = files.map(el => el.name);
    for (let i = 0; i < arrFileName.length; i++) {
      let elem = arrFileName[i];
      fs.promises.stat(path.join(pathSecretFolder, elem))
        .then(stats => {
          if (stats.isFile()) {
            const fileName = path.basename(path.join(pathSecretFolder, elem), path.extname(elem));
            const fileExtension = path.extname(elem).slice(1);
            const fileSize = Math.round(stats.size / 1024);
            console.log(`${fileName} - ${fileExtension} - ${fileSize}Kb`);
          } else {
            console.log(`This is not a file, but a directory: ${elem}`);
          }
        });
    }
  });
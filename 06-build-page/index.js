const fs = require('fs');
const path = require('path');
const {stat} = require('fs');
const pathStyle = path.join(__dirname, 'styles');
const pathRootHTML = path.join(__dirname, 'test-files', 'components', 'about.html');
const pathBitHTML = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathWork = path.join(__dirname, 'project-dist');
const copyFileRecursive = (from, to) => {//функция для рекурсивного копирования файлов
  //проверять папка или файл через stats.isDirectory
  fs.promises.stat(from)
    .then((stats) => {
      if (stats.isFile()) {
        fs.promises.copyFile(from, to);
      }
      if (stats.isDirectory()) {
        copyFileRecursive();
      }

    });

};
const build = async () => {
  fs.promises.stat(pathWork)
    .then(() => {//если папка есть
      fs.promises.readdir(pathAssets)
        .then(files => {
          const arr = files.map(el => {
            copyFileRecursive(path.join(pathAssets, el), path.join(pathWork, 'assets', el));//вызываем функци. на копирования
          });
          Promise.all(arr)
            .then(() => {
              console.log('Folder assets data updated successfully.');
            });
        });
    })
    .catch(err => {//если нет папки
      if (err.code === 'ENOENT') {
        fs.promises.mkdir(pathWork, {recursive: true});
        fs.promises.readdir(pathAssets)
          .then(files => {
            const arr = files.map(el => {
              copyFileRecursive(path.join(pathAssets, el), path.join(pathWork, 'assets', el));//вызываем функци. на копирования
            });
            Promise.all(arr)
              .then(() => {
                console.log('Folder assets successfully cloned.');
              });
          });
      }
    });
};
build();
console.log(__dirname);
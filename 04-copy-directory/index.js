const fs = require('fs');
const path = require('path');
const copyFiles = () => {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {//читаем содержимое нужной нам папки
    if (err) throw err;
    for (let i = 0; i < files.length; i++) {//терируемся по полученным данным
      fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), err => {//копирум по 1 файлу
        if (err) throw err;
      });
    }
  });
};
let copyDir = async () => {
  fs.stat(path.join(__dirname, 'files-copy'), function (err) {
    if (!err) {//если папка уже имеется
      copyFiles();
      console.log('The data has been successfully updated.');
    } else if (err.code === 'ENOENT') {//если папки не существует
      fs.mkdir('files-copy', {recursive: true}, err => {//создаем папку
        if (err) throw err;
        copyFiles();
      });
      console.log('Folder created successfully');
    }
  });
};
copyDir();
//The data has been successfully updated.

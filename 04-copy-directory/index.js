
const fs = require('fs');
const path = require('path');
const updatingFolderData='The data has been successfully updated.';
const createFolderData='Folder created successfully.';

const copyFiles = (message) => {
  fs.promises.readdir(path.join(__dirname, 'files'))
    .then(files => {
      for (let i = 0; i < files.length; i++) {//терируемся по полученным данным
        fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), err => {//копирум по 1 файлу
          if (err) throw err;
        });
      }
      console.log(message);
    });
};
let copyDir = async () => {
  fs.promises.stat(path.join(__dirname, 'files-copy'))
    .then(copyFiles(updatingFolderData))
    .catch(err => {
      if (err.code === 'ENOENT') {//если папки не существует
        fs.promises.mkdir('files-copy', {recursive: true})
          .then(copyFiles(createFolderData));
      }
    });
};
copyDir();

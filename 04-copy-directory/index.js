const fs = require('fs');
const path = require('path');
const updatingFolderData='The data has been successfully updated.';
const createFolderData='Folder created successfully.';

const copyFiles = async (message) => {
  fs.promises.readdir(path.join(__dirname, 'files'))
    .then(files => {
      let arr = files.map(el => {
        fs.promises.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el));
      });
      Promise.all(arr)
        .then(console.log(message));
    });
};
let copyDir = async () => {
  return fs.stat(path.join(__dirname, 'files-copy'), (err => {
    if (!err) {
      copyFiles(updatingFolderData);
    } else if (err.code === 'ENOENT') {//если папки не существует
      fs.promises.mkdir('files-copy', {recursive: true})
        .then(copyFiles(createFolderData));
    }
  }));

};
copyDir();

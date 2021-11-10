const fs = require('fs');
const path = require('path');
const updatingFolderData='The data has been successfully updated.';
const createFolderData='Folder created successfully.';

const copyFiles = async (message) => {
  fs.promises.readdir(path.join(__dirname, 'files'))
    .then(files => {
      let arr = files.map(async el => {
        await fs.promises.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el));
      });
      Promise.all(arr)
        .then(() => {
          console.log(message);
        });
    });
};
let copyDir = async () => {
  return fs.promises.stat(path.join(__dirname, 'files-copy'))
    .then(() => {
      copyFiles(updatingFolderData);
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        fs.promises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true})
          .then(() => {
            copyFiles(createFolderData);
          });
      }
    });

};
copyDir();

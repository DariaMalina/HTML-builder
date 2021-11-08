const path = require('path');
const fs = require('fs');
const folderToCopy = path.join(__dirname, 'styles');
const folderToInsert = path.join(__dirname, 'project-dist');
const dateUpdate = 'File bundle.css updated successfully.';
const dateCreate = 'File bundle.css has been successfully generated.';
const wayUpBundle=path.join(folderToInsert, 'bundle.css');
const func = async () => {
  try {
    fs.stat(path.join(folderToInsert, 'bundle.css'), err => {
      if (!err) {//если существует
        fs.promises.readdir(folderToCopy)
          .then(files => {
            fs.promises.writeFile(wayUpBundle, '');
            let arrFilesStyle = files.map(el => {
              if (path.extname(el) === '.css') {
                let content = fs.readFileSync(path.join(folderToCopy, el), 'utf8');
                fs.promises.appendFile(wayUpBundle, '\n' + content);
              }
            });
            Promise.all(arrFilesStyle).then(console.log(dateUpdate));
          });

      } else if (err.code === 'ENOENT') {//если не существует
        fs.promises.readdir(folderToCopy)
          .then(files => {
            let arrFilesStyle = files.map(el => {
              if (path.extname(el) === '.css') {
                let content = fs.readFileSync(path.join(folderToCopy, el), 'utf8');
                fs.promises.appendFile(wayUpBundle, content + '\n');
              }
            });
            Promise.all(arrFilesStyle).then(console.log(dateCreate));
          });
      }
    }
    );
  } catch (error) {
    console.log(error);
  }

};
func();

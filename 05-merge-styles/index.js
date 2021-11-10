const path = require('path');
const fs = require('fs');
const folderToCopy = path.join(__dirname, 'styles');
const folderToInsert = path.join(__dirname, 'project-dist');
const dateUpdate = 'File bundle.css updated successfully.';
const dateCreate = 'File bundle.css has been successfully generated.';
const wayUpBundle=path.join(folderToInsert, 'bundle.css');
const func = async () => {
  fs.promises.stat(path.join(folderToInsert, 'bundle.css'))
    .then(() => {//если существует
      fs.promises.readdir(folderToCopy)
        .then(files => {
          fs.promises.writeFile(wayUpBundle, '');
          let arrFilesStyle = files.map(el => {
            if (path.extname(el) === '.css') {
              fs.promises.readFile(path.join(folderToCopy, el), 'utf8')
                .then(data => fs.promises.appendFile(wayUpBundle, '\n' + data));

            }
          });
          Promise.all(arrFilesStyle).then(() => {
            console.log(dateUpdate);
          });
        });

    })
    .catch(err => {
      if (err.code === 'ENOENT') {//если не существует
        fs.promises.readdir(folderToCopy)
          .then(files => {
            let arrFilesStyle = files.map(el => {
              if (path.extname(el) === '.css') {
                fs.promises.readFile(path.join(folderToCopy, el), 'utf8')
                  .then(data => {
                    fs.promises.appendFile(wayUpBundle, data + '\n');
                  });

              }
            });
            Promise.all(arrFilesStyle).then(() => {
              console.log(dateCreate);
            });
          });
      }
    }
    );
};
func();

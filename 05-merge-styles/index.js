const path = require('path');
const fs = require('fs');
const folderToCopy = path.join(__dirname, 'styles');
const folderToInsert = path.join(__dirname, 'project-dist');


try {
  fs.stat(
    path.join(folderToInsert, 'bundle.css'), err => {
      if (!err) {//если существует
        fs.readdir(folderToCopy, (err, files) => {
          if (err)
            console.log(err);
          else {
            let arrFilesStyle = files;
            for (let i = 0; i < arrFilesStyle.length; i++) {
              if (path.extname(arrFilesStyle[i]) === '.css') {
                let content = fs.readFileSync(path.join(folderToCopy, arrFilesStyle[i]), 'utf8');
                fs.writeFile(path.join(folderToInsert, 'bundle.css'), content, err => {
                  if (err)
                    console.log(err);
                });
              }
            }
          }
        });
        console.log('file bundle.css updated successfully');
      } else if (err.code === 'ENOENT') {
        fs.readdir(folderToCopy, (err, files) => {
          if (err)
            console.log(err);
          else {
            let arrFilesStyle = files;
            for (let i = 0; i < arrFilesStyle.length; i++) {
              if (path.extname(arrFilesStyle[i]) === '.css') {
                let content = fs.readFileSync(path.join(folderToCopy, arrFilesStyle[i]), 'utf8');
                fs.appendFile(path.join(folderToInsert, 'bundle.css'), content, err => {
                  if (err)
                    console.log(err);
                });
              }
            }
          }
        });
        console.log('file bundle.css has been successfully generated.');

      }
    }
  );


} catch (error) {

  console.log(error);
}

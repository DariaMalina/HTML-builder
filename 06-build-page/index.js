const fs = require('fs');
const path = require('path');

const folderToCopy = path.join(__dirname, 'styles');
const pathRootHTML = path.join(__dirname, 'template.html');
const pathBitHTML = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathWork = path.join(__dirname, 'project-dist');
const pathWorkAssets = path.join(pathWork, 'assets');
const wayUpStyle = path.join(pathWork, 'style.css');

fs.promises.stat(pathWork).catch(err => {
  if (err.code === 'ENOENT') {
    fs.promises.mkdir(pathWork).catch(err => console.log(err));
    fs.promises.mkdir(pathWorkAssets).catch(err => console.log(err));
  }
});


const copyFiles = async (workAssets, copyAssets) => {
  fs.promises.readdir(copyAssets)
    .then(async files => {
      files.map(el => {
        fs.promises.stat(path.join(copyAssets, el)).then((stats) => {
          if (stats.isDirectory()) {
            fs.promises.mkdir(path.join(workAssets, el)).catch(err => console.log(err));
            copyFiles(path.join(workAssets, el), path.join(copyAssets, el));
          } else {
            fs.promises.copyFile(path.join(copyAssets, el), path.join(workAssets, el));
          }
        });
      });
    });
};
const copyDir = async () => {

  return fs.promises.stat(pathWorkAssets)
    .then(() => {
      copyFiles(pathWorkAssets, pathAssets);
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        fs.promises.mkdir(pathWorkAssets, {recursive: true})
          .then(() => {
            copyFiles(pathWorkAssets, pathAssets);
          });
      }
    });

};


const createHTML = async () => {
  let rootHTML = await fs.promises.readFile(pathRootHTML, 'utf8');
  fs.promises.readdir(pathBitHTML).then(files => {
    files.map(el => {
      fs.promises.stat(path.join(pathBitHTML, el)).then(async () => {
        const name = el.slice(0, -5);
        const data = await fs.promises.readFile(path.join(pathBitHTML, el),  'utf8');
        rootHTML = rootHTML.replace(`{{${name}}}`, data);
        await fs.promises.writeFile(path.join(pathWork, 'index.html'), rootHTML);
      });
    });
  });

};


const createCSS = async () => {
  await fs.promises.stat(path.join(pathWork, 'style.css'))
    .then(() => {//если существует
      fs.promises.readdir(folderToCopy)
        .then(files => {
          fs.promises.writeFile(wayUpStyle, '');
          files.map(el => {
            fs.promises.readFile(path.join(folderToCopy, el), 'utf8')
              .then(data => fs.promises.appendFile(wayUpStyle, '\n' + data));
          });
        });

    })
    .catch(err => {
      if (err.code === 'ENOENT') {//если не существует
        fs.promises.readdir(folderToCopy)
          .then(files => {
            files.map(el => {
              fs.promises.readFile(path.join(folderToCopy, el), 'utf8')
                .then(data => {
                  fs.promises.appendFile(wayUpStyle, data + '\n');
                });
            });

          });
      }
    }
    );
};
createHTML();
createCSS();
copyDir();


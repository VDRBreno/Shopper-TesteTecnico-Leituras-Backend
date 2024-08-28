import path from 'node:path';
import fs from 'node:fs';

export default function ConfigureEnvironment() {

  const srcFolderPath = path.join(__dirname, '..');

  checkImagesFolder();

  function checkImagesFolder() {

    const imagesFolderPath = path.join(srcFolderPath, '..', 'images');
    if(!fs.existsSync(imagesFolderPath)) {
      fs.mkdirSync(imagesFolderPath);
    }

  }

}
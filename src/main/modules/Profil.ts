import fs from 'fs';

import { IpcOn } from '@/main/decorators';
import { SAVE_PATH } from '@/main/utils/Constants';

class ProfilModule {
  @IpcOn
  static fetchCharactersFiles(profilId: string): Array<string> {
    const path = `${SAVE_PATH}/${profilId}/Characters`;
    if (fs.existsSync(path)) {
      return fs
        .readdirSync(path)
        .filter((file) => /^.*\.dat?$/.test(file))
      ;
    }
    return [];
  }

  @IpcOn
  fetchProfilFolders() {
    if (fs.existsSync(SAVE_PATH)) {
      return fs
        .readdirSync(SAVE_PATH)
        .filter((file) => {
          if (fs.lstatSync(`${SAVE_PATH}/${file}`).isDirectory()) {
            const profilFolderContent = fs.readdirSync(`${SAVE_PATH}/${file}`);
            return profilFolderContent.indexOf('Characters') >= 0 && profilFolderContent.indexOf('savefile.dat') >= 0;
          }
          return false;
        })
      ;
    }
    return [];
  }
}

export default () => ProfilModule;

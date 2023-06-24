import fs from 'fs';
import Constants from '../Constants';
import Module from './Module';

/**
 * @param {IpcMainEvent} e
 */
function $fetchProfilFolders(e) {
  if (fs.existsSync(Constants.SAVE_PATH)) {
    e.returnValue = fs
      .readdirSync(Constants.SAVE_PATH)
      .filter((file) => {
        if (fs.lstatSync(`${Constants.SAVE_PATH}/${file}`).isDirectory()) {
          const profilFolderContent = fs.readdirSync(`${Constants.SAVE_PATH}/${file}`);
          return profilFolderContent.indexOf('Characters') >= 0 && profilFolderContent.indexOf('savefile.dat') >= 0;
        }
        return false;
      })
    ;
  } else {
    e.returnValue = [];
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class ProfilListerModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('fetch-profil-folders', $fetchProfilFolders);
  }
}

export default new ProfilListerModule();

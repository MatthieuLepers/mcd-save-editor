import fs from 'fs';
import Constants from '../Constants';
import Module from './Module';

/**
 * @param {IpcMainEvent} e
 * @param {String} profilId
 */
function $fetchCharactersFiles(e, profilId) {
  const path = `${Constants.SAVE_PATH}/${profilId}/Characters`;
  if (fs.existsSync(path)) {
    e.returnValue = fs
      .readdirSync(path)
      .filter((file) => /^.*\.dat?$/.test(file))
    ;
  } else {
    e.returnValue = [];
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class ProfilModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('fetch-characters-files', $fetchCharactersFiles);
  }
}

export default new ProfilModule();

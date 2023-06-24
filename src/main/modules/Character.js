import fs from 'fs';
import Constants from '../Constants';
import Module from './Module';

/**
 * @param {IpcMainEvent} e
 * @param {String} filePath
 */
function $fetchCharacterBackups(e, filePath) {
  const backupFolder = `${Constants.SAVE_PATH}/${filePath.replace('.dat', '')}`;
  const characterId = backupFolder.split('/').pop();
  if (fs.existsSync(backupFolder)) {
    e.returnValue = fs
      .readdirSync(backupFolder)
      .filter((file) => new RegExp(`^${characterId}-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}h[0-9]{2}\\.json\\.bak$`).test(file))
    ;
  } else {
    e.returnValue = [];
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class CharacterModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('fetch-character-backups', $fetchCharacterBackups);
  }
}

export default new CharacterModule();

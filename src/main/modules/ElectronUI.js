import fs from 'fs';
import Module from './Module';

/**
 * @param {IpcMainEvent} e
 * @param {String} filePath
 * @param {Object} data
 */
function $handleWriteFileSync(e, filePath, data) {
  e.returnValue = fs.writeFileSync(filePath, data);
}

/**
 * @param {IpcMainEvent} e
 * @param {String} filePath
 */
function $handleReadFileSync(e, filePath) {
  e.returnValue = `${fs.readFileSync(filePath)}`;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class ElectronUIModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('write-file-sync', $handleWriteFileSync);
    ipcMain.on('read-file-sync', $handleReadFileSync);
  }
}

export default new ElectronUIModule();

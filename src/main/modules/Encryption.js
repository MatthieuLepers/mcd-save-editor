import { execFile } from 'child_process';
import fs from 'fs';
import Constants from '../Constants';
import Module from './Module';
import InventoryValidator from './validation/InventoryValidator';
import StorageChestValidator from './validation/StorageChestValidator';

const DTOOLS_PATH = process.env.NODE_ENV === 'development'
  ? `${process.cwd()}/static/dtools.exe`
  : require('path').join(__dirname, '/static/dtools.exe').replace(/\\/g, '/')
;

/**
 * @param {String} file
 * @return {Boolean}
 */
function $makeFileBackup(file) {
  try {
    const ext = file.substring(file.lastIndexOf('.') + 1);
    const filePath = file.replace(`.${ext}`, '');
    const fileName = file.substring(file.lastIndexOf('/') + 1).replace(`.${ext}`, '');
    const fileContent = fs.readFileSync(file);
    const date = new Date().toISOString().replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2}).*/, '$1-$2-$3-$4h$5');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    fs.writeFileSync(`${filePath}/${fileName}-${date}.${ext}.bak`, fileContent);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @param {String} file
 * @param {String[]} options
 * @return {Promise}
 */
function $execFileAsync(file, options = []) {
  return new Promise((resolve, reject) => {
    execFile(file, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout || stderr || true);
    });
  });
}

/**
 * @param {IpcMainEvent} e
 * @param {Object} data
 * @param {String} file
 * @param {Boolean} overwrite
 * @return {Boolean}
 */
async function $handleEncryptFile(e, data, file, overwrite = true) {
  const decryptedFilePath = `${Constants.SAVE_PATH}/${file.replace('.dat', '.json')}`;
  const inventoryValidator = new InventoryValidator(data);
  const storageChestValidator = new StorageChestValidator(data);
  if (!inventoryValidator.isValid() || !storageChestValidator.isValid()) {
    return false;
  }
  fs.writeFileSync(decryptedFilePath, JSON.stringify(data, null, 2));

  let success = false;
  if (fs.existsSync(decryptedFilePath)) {
    success = await $execFileAsync(DTOOLS_PATH, overwrite ? [decryptedFilePath, '--overwrite=false'] : [decryptedFilePath]);
  }
  return success;
}

/**
 * @param {IpcMainEvent} e
 * @param {Object} data
 * @param {Boolean} force
 * @return {Object}
 */
async function $handleDecryptFile(e, file, force) {
  const filePath = `${Constants.SAVE_PATH}/${file}`;
  const decryptedFilePath = filePath.replace('.dat', '.json');
  if (!fs.existsSync(decryptedFilePath) || force) {
    const success = await $execFileAsync(DTOOLS_PATH, [filePath]);
    const fileContent = JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
    const inventoryValidator = new InventoryValidator(fileContent);
    const storageChestValidator = new StorageChestValidator(fileContent);
    const corrupted = !inventoryValidator.isValid() && !storageChestValidator.isValid();
    if (success && ((!corrupted && $makeFileBackup(decryptedFilePath)) || corrupted)) {
      return fileContent;
    }
    return {};
  }
  return JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
}

/**
 * @param {IpcMainEvent} e
 * @param {String} profilId
 * @param {String} characterId
 * @param {String} file
 * @return {Boolean}
 */
async function $handleRestoreBackup(e, profilId, characterId, file) {
  const filePath = `${Constants.SAVE_PATH}/${profilId}/Characters/${characterId}/${file}`;
  if (fs.existsSync(filePath)) {
    const destFilePath = `${Constants.SAVE_PATH}/${profilId}/Characters/${characterId}.json`;
    fs.copyFileSync(filePath, destFilePath);
    const encryptSuccess = await $execFileAsync(DTOOLS_PATH, [destFilePath]);
    return encryptSuccess;
  }
  return false;
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class EncryptionModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.handle('encrypt-file', $handleEncryptFile);
    ipcMain.handle('decrypt-file', $handleDecryptFile);
    ipcMain.handle('restore-backup', $handleRestoreBackup);
  }
}

export default new EncryptionModule();

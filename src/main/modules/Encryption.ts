import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';

import { IpcHandle } from '@/main/decorators';
import { SAVE_PATH } from '@/main/utils/Constants';
import InventoryValidator from '@/main/classes/validation/InventoryValidator';
import StorageChestValidator from '@/main/classes/validation/StorageChestValidator';

const DTOOLS_PATH = path.resolve(__dirname, '../../public/dtools.exe');

class EncryptionModule {
  static makeFileBackup(file: string): boolean {
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

  static async execFileAsync(file: string, options: any[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      execFile(file, options ?? [], (error) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    });
  }

  @IpcHandle
  static async encryptFile(json: string, file: string, overwrite = true): Promise<boolean> {
    const decryptedFilePath = `${SAVE_PATH}/${file.replace('.dat', '.json')}`;
    const data = JSON.parse(json);
    const inventoryValidator = new InventoryValidator(data);
    const storageChestValidator = new StorageChestValidator(data);
    if (!inventoryValidator.isValid() || !storageChestValidator.isValid()) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(inventoryValidator.errors, storageChestValidator.errors);
      }
      return false;
    }
    fs.writeFileSync(decryptedFilePath, JSON.stringify(data, null, 2));

    let success = false;
    if (fs.existsSync(decryptedFilePath)) {
      success = await EncryptionModule.execFileAsync(DTOOLS_PATH, overwrite ? [decryptedFilePath, '--overwrite=false'] : [decryptedFilePath]);
    }
    return success;
  }

  @IpcHandle
  static async decryptFile(file: string, force: boolean): Promise<any> {
    const filePath = `${SAVE_PATH}/${file}`;
    const decryptedFilePath = filePath.replace('.dat', '.json');
    if (!fs.existsSync(decryptedFilePath) || force) {
      const success = await EncryptionModule.execFileAsync(DTOOLS_PATH, [filePath]);
      const fileContent = JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
      const inventoryValidator = new InventoryValidator(fileContent);
      const storageChestValidator = new StorageChestValidator(fileContent);
      const corrupted = !inventoryValidator.isValid() && !storageChestValidator.isValid();
      if (success && ((!corrupted && EncryptionModule.makeFileBackup(decryptedFilePath)) || corrupted)) {
        return fileContent;
      }
      return {};
    }
    return JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
  }

  @IpcHandle
  static async restoreBackup(profilId: string, characterId: string, file: string): Promise<boolean> {
    const filePath = `${SAVE_PATH}/${profilId}/Characters/${characterId}/${file}`;
    if (fs.existsSync(filePath)) {
      const destFilePath = `${SAVE_PATH}/${profilId}/Characters/${characterId}.json`;
      fs.copyFileSync(filePath, destFilePath);
      const encryptSuccess = await EncryptionModule.execFileAsync(DTOOLS_PATH, [destFilePath]);
      return encryptSuccess;
    }
    return false;
  }
}

export default () => EncryptionModule;

import { ipcRenderer } from 'electron';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class EncryptionService {
  /**
   * @param {Object} data
   * @param {String} file
   * @param {Boolean} overwrite
   * @return {Promise<Boolean>}
   */
  static encrypt(data, file, overwrite = true) {
    return ipcRenderer.invoke('encrypt-file', data, file, overwrite);
  }

  /**
   * @param {String} file
   * @param {Boolean} force
   * @return {Promise<Object>}
   */
  static decrypt(file, force = false) {
    return ipcRenderer.invoke('decrypt-file', file, force);
  }
}

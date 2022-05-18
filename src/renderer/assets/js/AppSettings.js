import { ipcRenderer } from 'electron';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class AppSettings {
  /**
   * @constructor
   */
  constructor() {
    this.data = ipcRenderer.sendSync('read-settings-file');

    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key],
        set: (value) => {
          this.data[key] = value;
          ipcRenderer.sendSync('save-settings-file', this.data);
        },
      });
    });
  }
}

export default new AppSettings();

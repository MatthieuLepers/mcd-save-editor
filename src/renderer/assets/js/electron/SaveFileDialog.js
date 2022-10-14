import { ipcRenderer, remote } from 'electron';
import os from 'os';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class SaveFileDialog {
  /**
   * @constructor
   * @param {Object} options
   */
  constructor(options) {
    this.options = {
      title: 'Save as...',
      defaultPath: `${os.homedir()}/Desktop`,
      buttonLabel: 'Save',
      filters: [
        { name: 'All files', extensions: ['*'] },
      ],
      properties: [],
    };

    Object.assign(this.options, options);
  }

  /**
   * @return {String}
   */
  showDialog() {
    return remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), this.options);
  }

  /**
   * @param {String} data
   */
  saveFile(data) {
    const filePath = this.showDialog();

    if (filePath) {
      ipcRenderer.sendSync('write-file-sync', filePath, data);
    }
  }
}

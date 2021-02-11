import { ipcRenderer, remote } from 'electron';
import os from 'os';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class OpenFileDialog {
  /**
   * @constructor
   * @param {Object} options
   */
  constructor(options) {
    this.options = {
      title: 'Open file...',
      defaultPath: `${os.homedir()}/Desktop`,
      buttonLabel: 'Save',
      filters: [
        { name: 'All files', extensions: ['*'] },
      ],
      properties: ['openFile'],
    };

    Object.assign(this.options, options);
  }

  /**
   * @return {String[]}
   */
  showDialog() {
    return remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), this.options);
  }

  /**
   * @return {String|null}
   */
  openFile() {
    const filePath = this.showDialog();

    if (filePath) {
      return ipcRenderer.sendSync('read-file-sync', filePath.pop());
    }
    return null;
  }
}

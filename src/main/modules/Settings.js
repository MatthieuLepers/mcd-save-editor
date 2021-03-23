import fs from 'fs';
import Constants from '../Constants';
import Module from './Module';

const DEFAULT_SETTINGS = {
  firstStart: true,
  language: 'en-EN',
};

/**
 * @param {IpcMainEvent} e
 */
function $handleReadSettingsFile(e) {
  if (!fs.existsSync(Constants.SETTINGS_FILE)) {
    fs.writeFileSync(Constants.SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    e.returnValue = DEFAULT_SETTINGS;
  } else {
    e.returnValue = JSON.parse(`${fs.readFileSync(Constants.SETTINGS_FILE)}`);
  }
}

/**
 * @param {IpcMainEvent} e
 * @param {Object} data
 */
function $handleSaveSettingsFile(e, data) {
  try {
    fs.writeFileSync(Constants.SETTINGS_FILE, JSON.stringify(data, null, 2));
    e.returnValue = true;
  } catch (e) {
    e.returnValue = false;
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class SettingsModule extends Module {
  /**
   * @inheritdoc
   */
  register(ipcMain) {
    ipcMain.on('read-settings-file', $handleReadSettingsFile);
    ipcMain.on('save-settings-file', $handleSaveSettingsFile);
  }
}

export default new SettingsModule();

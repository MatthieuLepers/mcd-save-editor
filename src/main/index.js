import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import { exec } from 'child_process';
import os from 'os';
import fs from 'fs';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1048,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      enableRemoteModule: true,
    },
    resizable: false,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const SAVE_PATH = `${os.homedir()}/Saved Games/Mojang Studios/Dungeons`;

/**
 * ProfilLister.fetchProfilFolders
 */
ipcMain.on('fetch-profil-folders', (e) => {
  if (fs.existsSync(SAVE_PATH)) {
    e.returnValue = fs
      .readdirSync(SAVE_PATH)
      .filter((file) => {
        if (fs.lstatSync(`${SAVE_PATH}/${file}`).isDirectory()) {
          const profilFolderContent = fs.readdirSync(`${SAVE_PATH}/${file}`);
          return profilFolderContent.indexOf('Characters') >= 0 && profilFolderContent.indexOf('savefile.dat') >= 0;
        }
        return false;
      })
    ;
  } else {
    e.returnValue = [];
  }
});

/**
 * Profil.loadCharacters
 */
ipcMain.on('fetch-characters-files', (e, profilId) => {
  const path = `${SAVE_PATH}/${profilId}/Characters`;
  if (fs.existsSync(path)) {
    e.returnValue = fs
      .readdirSync(path)
      .filter(file => /^.*\.dat?$/.test(file))
    ;
  } else {
    e.returnValue = [];
  }
});

/**
 * @param {String} file
 * @return {Boolean}
 */
const makeFileBackup = (file) => {
  try {
    const ext = file.substr(file.lastIndexOf('.') + 1);
    const filePath = file.replace(`.${ext}`, '');
    const fileName = file.substr(file.lastIndexOf('/') + 1).replace(`.${ext}`, '');
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
};

/**
 * @param {String} command
 * @return {Promise}
 */
const execCommandAsync = command => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    }
    resolve(stdout || stderr || true);
  });
});

/**
 * EncryptionService.encrypt
 * @git dtools.exe : https://github.com/HellPie/DungeonTools
 */
ipcMain.handle('encrypt-file', async (e, data, file, overwrite) => {
  const decryptedFilePath = `${SAVE_PATH}/${file.replace('.dat', '.json')}`;
  fs.writeFileSync(decryptedFilePath, JSON.stringify(data, null, 2));

  let success = false;
  if (fs.existsSync(decryptedFilePath)) {
    success = await execCommandAsync(`${process.cwd()}/static/dtools.exe "${decryptedFilePath}"${overwrite ? ' --overwrite=false' : ''}`);
  }
  return success;
});

/**
 * EncryptionService.decrypt
 * @git dtools.exe : https://github.com/HellPie/DungeonTools
 */
ipcMain.handle('decrypt-file', async (e, file, force) => {
  const filePath = `${SAVE_PATH}/${file}`;
  const decryptedFilePath = filePath.replace('.dat', '.json');
  if (!fs.existsSync(decryptedFilePath) || force) {
    if (!makeFileBackup(filePath)) {
      return {};
    }
    const success = await execCommandAsync(`${process.cwd()}/static/dtools.exe "${filePath}"`);
    if (success) {
      return JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
    }
    return {};
  }
  return JSON.parse(`${fs.readFileSync(decryptedFilePath)}`);
});

/**
 * SaveFileDialog.saveFile
 */
ipcMain.on('write-file-sync', (e, filePath, data) => {
  e.returnValue = fs.writeFileSync(filePath, data);
});

/**
 * OpenFileDialog.openFile
 */
ipcMain.on('read-file-sync', (e, file) => {
  e.returnValue = `${fs.readFileSync(file)}`;
});

const SETTINGS_FILE = `${SAVE_PATH}/settings.json`;
const DEFAULT_SETTINGS = {
  firstStart: true,
  language: 'en-EN',
};

/**
 * Settings.load
 */
ipcMain.on('read-settings-file', (e) => {
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    e.returnValue = DEFAULT_SETTINGS;
  } else {
    e.returnValue = JSON.parse(`${fs.readFileSync(SETTINGS_FILE)}`);
  }
});

/**
 * Settings.save
 */
ipcMain.on('save-settings-file', (e, data) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2));
    e.returnValue = true;
  } catch (e) {
    e.returnValue = false;
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

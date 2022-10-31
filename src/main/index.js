import 'regenerator-runtime/runtime';
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import ModuleManager from './modules/Manager';
import ProfilListerModule from './modules/ProfilLister';
import ProfilModule from './modules/Profil';
import CharacterModule from './modules/Character';
import EncryptionModule from './modules/Encryption';
import ElectronUIModule from './modules/ElectronUI';
import SettingsModule from './modules/Settings';

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

ModuleManager.registerModule(
  ProfilListerModule,
  ProfilModule,
  CharacterModule,
  EncryptionModule,
  ElectronUIModule,
  SettingsModule,
);

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 * https://github.com/iffy/electron-updater-example
 */
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates();
});

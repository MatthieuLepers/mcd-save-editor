import {
  BrowserWindow,
  shell,
  ipcMain,
  type BrowserWindowConstructorOptions,
} from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';

import WindowStore from '@/main/stores/WindowStore';

interface Template {
  file: string;
  routePath: string | null;
}

export default class ElectronWindow extends BrowserWindow {
  public name: string;

  public template: Template;

  constructor(name: string, options: BrowserWindowConstructorOptions) {
    super(options);
    this.name = name;
    this.template = {
      file: 'index.html',
      routePath: null,
    };
  }

  init() {
    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
      this.loadURL(`${process.env.ELECTRON_RENDERER_URL}/${this.template.file}${this.template.routePath ? `/#/${this.template.routePath}` : '/#/'}`);
    } else {
      this.loadURL(`file://${join(__dirname, '../renderer')}/${this.template.file}${this.template.routePath ? `#${this.template.routePath}` : ''}`);
    }

    if (is.dev) {
      this.webContents.on('did-frame-finish-load', () => {
        this.webContents.once('devtools-opened', () => {
          this.focus();
        });
        this.webContents.openDevTools();
      });
    }

    const handleMinimize = () => {
      if (this.minimizable) {
        this.minimize();
      }
    };
    const handleMaximize = () => {
      if (this.maximizable) {
        if (this.isMaximized()) {
          this.unmaximize();
        } else {
          this.maximize();
        }
      }
    };
    const handleClose = () => {
      if (this.isClosable()) {
        if (this.webContents.isDevToolsOpened()) {
          this.webContents.closeDevTools();
        }
        ipcMain.off(`minimize:${this.name}`, handleMinimize);
        ipcMain.off(`maximize:${this.name}`, handleMaximize);
        ipcMain.off(`close:${this.name}`, handleClose);
        WindowStore.unregister(this);
        this.close();
      }
    };

    ipcMain.on(`minimize:${this.name}`, handleMinimize);
    ipcMain.on(`maximize:${this.name}`, handleMaximize);
    ipcMain.on(`close:${this.name}`, handleClose);

    this.on('ready-to-show', () => {
      this.show();
    });

    this.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
    });

    WindowStore.register(this);
  }

  setTemplate(routePath: string | null, file = 'index.html'): this {
    this.template.file = file;
    this.template.routePath = routePath;
    return this;
  }

  sendData(channel: string, ...data: any[]) {
    this.webContents.send(channel, ...data);
  }
}

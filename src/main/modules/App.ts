import { OpenDialogOptions, dialog, type SaveDialogOptions } from 'electron';
import fs from 'fs';
import { exec } from 'child_process';

import { IpcHandle, IpcOn, GlobalShortcut } from '@/main/decorators';
import { Setting } from '@/main/database/models';
import WindowStore from '@/main/stores/WindowStore';
import WinstonInstance from '@/main/utils/WinstonInstance';

class AppModule {
  @IpcHandle
  static async localeChange(iso: string): Promise<void> {
    WindowStore.broadcastData('localeChange', iso);

    const localeSetting = await Setting.findByPk('locale');
    if (localeSetting) {
      await localeSetting.update({ value: iso });
    }
  }

  @IpcHandle
  static async sendDataToWindow(windowName: string, channel: string, ...args: any[]): Promise<void> {
    WindowStore.sendData(windowName, channel, ...args);
  }

  @IpcHandle
  static async openGithubLink(githubLink: string): Promise<void> {
    exec(`start ${githubLink}`);
  }

  @IpcOn
  static logError(error: string) {
    WinstonInstance.error(error);
  }

  @IpcOn
  static databaseReady() {
    WindowStore.getVisibleWindows().forEach((win) => {
      win.sendData('database-ready');
      win.webContents.addListener('did-finish-load', () => {
        win.sendData('database-ready');
      });
    });
  }

  @GlobalShortcut('Alt+F4')
  static closeAppNonDarwin() {
    const win = WindowStore.get('main');
    if (win) {
      win.close();
    }
  }

  @GlobalShortcut('Command+Q')
  static closeAppDarwin() {
    const win = WindowStore.get('main');
    if (win) {
      win.close();
    }
  }

  @IpcHandle
  static async exportItem(dialogOptions: Partial<SaveDialogOptions>, itemJson: string) {
    const mainWindow = WindowStore.get('main')!;
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, dialogOptions);

    if (canceled || !filePath?.length) return;

    fs.writeFileSync(filePath, itemJson);
  }

  @IpcHandle
  static async importItem(dialogOptions: Partial<OpenDialogOptions>): Promise<string | null> {
    const mainWindow = WindowStore.get('main')!;
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, dialogOptions);

    if (canceled || !filePaths.length || !fs.existsSync(filePaths[0])) return null;

    return `${fs.readFileSync(filePaths[0])}`;
  }
}

export default () => AppModule;

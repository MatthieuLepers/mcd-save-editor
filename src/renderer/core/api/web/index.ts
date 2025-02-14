import i18n from '@renderer/plugins/i18n';
import * as AncientMob from '@renderer/core/api/web/AncientMob';
import * as Armor from '@renderer/core/api/web/Armor';
import * as ArmorProperty from '@renderer/core/api/web/ArmorProperty';
import * as Artefact from '@renderer/core/api/web/Artefact';
import * as Dlc from '@renderer/core/api/web/Dlc';
import * as Enchant from '@renderer/core/api/web/Enchant';
import * as Event from '@renderer/core/api/web/Event';
import * as Weapon from '@renderer/core/api/web/Weapon';
import * as Setting from '@renderer/core/api/web/Setting';
import {
  download,
  openFile,
  openLink,
  readFile,
} from '@renderer/core/utils';
import { notificationStore } from '@/renderer/components/Materials/Notification/Store';

function send(channel: string, ...args: any[]) {
  const event = new CustomEvent(channel, { detail: { ...args } });
  document.body.dispatchEvent(event);
}

const API_FALLBACKS: Record<string, Function> = {
  async localeChange(iso: string) {
    send('localeChange', iso);
    await Setting.updateOrCreate(`{"key": "locale", "value": "${iso}"}`);
  },
  async openGithubLink(link: string) {
    openLink(link);
  },
  async exportItem(_dialogOptions: Object, itemContentJson: string) {
    download('item.json', itemContentJson);
  },
  async importItem() {
    const files = await openFile();
    if (files?.length) return readFile(files[0]);
    return '';
  },
  async restoreBackup() {
    notificationStore.actions.error(i18n.global.t('App.webMode'));
  },
  async encryptFile() {
    notificationStore.actions.error(i18n.global.t('App.webMode'));
  },
  async decryptFile() {
    notificationStore.actions.error(i18n.global.t('App.webMode'));
  },
  fetchCharactersFiles(): Array<string> {
    return [];
  },
  fetchProfilFolders(): Array<string> {
    return [];
  },
};

export const api = {
  async invoke(channel: string, ...args: any[]) {
    return API_FALLBACKS[channel](...args);
  },
  send,
  sendSync(channel: string, ...args: any[]) {
    return API_FALLBACKS[channel](...args);
  },
  on(channel: string, func: Function) {
    document.body.addEventListener(channel, (e) => func(...Object.values((e as CustomEvent).detail)));
  },
  AncientMob,
  Armor,
  ArmorProperty,
  Artefact,
  Dlc,
  Enchant,
  Event,
  Weapon,
  Setting,
  CipherUtils: {
    cipher(_options: Object, str: string): string {
      return btoa(str);
    },
    decipher(_options: Object, str: string): string {
      return atob(str);
    },
  },
  homedir: '/',
  plateform: navigator.userAgent,
  clipboard: navigator.clipboard,
  isDev: process.env.NODE_ENV !== 'production',
  isWeb: true,
};

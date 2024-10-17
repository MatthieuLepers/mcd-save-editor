import { ipcRenderer, clipboard } from 'electron';

import * as AncientMob from '@/main/api/ancientMob';
import * as Armor from '@/main/api/armor';
import * as ArmorProperty from '@/main/api/armorProperty';
import * as Artefact from '@/main/api/artefact';
import * as Dlc from '@/main/api/dlc';
import * as Enchant from '@/main/api/enchant';
import * as Event from '@/main/api/event';
import * as Weapon from '@/main/api/weapon';
import * as Setting from '@/main/api/setting';
import * as CipherUtils from '@/main/utils/CipherUtils';
import { APP_PLATEFORM, HOME_DIR, IS_DEV } from '@/main/utils/Constants';

export default {
  async invoke(channel: string, ...args: any[]): Promise<any> {
    return ipcRenderer.invoke(channel, ...args);
  },
  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args);
  },
  sendSync(channel: string, ...args: any[]): any {
    return ipcRenderer.sendSync(channel, ...args);
  },
  on(channel: string, func: Function) {
    ipcRenderer.on(channel, (_e, ...args) => func(...args));
  },
  CipherUtils,
  AncientMob,
  Armor,
  ArmorProperty,
  Artefact,
  Dlc,
  Enchant,
  Event,
  Weapon,
  Setting,
  homedir: HOME_DIR,
  plateform: APP_PLATEFORM,
  clipboard,
  isDev: IS_DEV,
};

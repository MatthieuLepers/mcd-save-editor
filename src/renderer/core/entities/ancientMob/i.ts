import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IAncientMobI18n extends II18nModel {
  locale: string;
  name: string;
}

export interface IAncientMob {
  id: string;
  neededRunes: Array<string>;
  rewards: Array<string>;
  i18n: Array<{ dataValues: IAncientMobI18n }>;
}

export interface IRemoteAncientMob {
  dataValues: IAncientMob;
}

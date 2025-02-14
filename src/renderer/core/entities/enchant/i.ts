import type { Tier, Type } from '@renderer/core/entities/enchant/enums';
import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IEnchantI18n extends II18nModel {
  locale: string;
  name: string;
  desc: string;
  level: [string, string, string];
}

export interface IEnchant {
  id: string;
  dlcId?: string;
  type: Array<`${Type}`>;
  tier: `${Tier}`;
  i18n: Array<{ dataValues: IEnchantI18n }>;
}

export interface IRemoteEnchant {
  dataValues: IEnchant;
}

export interface IGameEnchant {
  id: string;
  investedPoints: number;
  level: number;
}

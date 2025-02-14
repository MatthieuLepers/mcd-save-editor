import type { Rarity } from '@renderer/core/entities/item/enums';
import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IArmorPropertyI18n extends II18nModel {
  locale: string;
  name: string;
}

export interface IArmorProperty {
  id: string;
  dlcId?: string;
  i18n: Array<{ dataValues: IArmorPropertyI18n }>;
}

export interface IRemoteArmorProperty {
  dataValues: IArmorProperty;
}

export interface IGameArmorProperty {
  id: string;
  rarity: `${Rarity}`;
}

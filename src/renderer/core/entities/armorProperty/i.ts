import type { Rarity } from '@renderer/core/entities/item/enums';

export interface IArmorPropertyI18n {
  locale: string;
  name: string;
}

export interface IArmorProperty {
  id: string;
  dlcId: string | null;
  i18n: Array<IArmorPropertyI18n>;
}

export interface IGameArmorProperty {
  id: string;
  rarity: `${Rarity}`;
}

import type { Tier, Type } from '@renderer/core/entities/enchant/enums';

export interface IEnchantI18n {
  locale: string;
  name: string;
  desc: string;
  level: [string, string, string];
}

export interface IEnchant {
  id: string;
  dlcId: string | null;
  type: Array<`${Type}`>;
  tier: `${Tier}`;
  i18n: Array<IEnchantI18n>;
}

export interface IGameEnchant {
  id: string;
  investedPoints: number;
  level: number;
}

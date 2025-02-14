import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';
import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IWeaponI18n extends II18nModel {
  locale: string;
  name: string;
}

export interface IMeleeWeaponStats {
  power: number;
  speed: number;
  area: number;
}

export interface IRangedWeaponStats {
  power: number;
  speed: number;
  ammo: number;
}

export interface IWeapon {
  id: string;
  dlcId?: string;
  events?: Array<string>;
  type: Exclude<`${Type}`, 'Armor' | 'Artefact'>;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  stats: IMeleeWeaponStats | IRangedWeaponStats;
  soulgathering: boolean;
  activeEnchants: Array<string>;
  i18n: Array<{ dataValues: IWeaponI18n }>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}

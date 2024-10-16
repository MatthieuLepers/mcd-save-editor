import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';

export interface IWeaponI18n {
  locale: string;
  name: string;
}

export interface IWeapon {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: Exclude<`${Type}`, 'Armor' | 'Artefact'>;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  stats: Record<string, number>;
  soulgathering: boolean;
  activeEnchants: Array<string>;
  i18n: Array<IWeaponI18n>;
}

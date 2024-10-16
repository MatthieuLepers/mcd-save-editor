import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';

export interface IArmorI18n {
  locale: string;
  name: string;
}

export interface IArmor {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: Type.ARMOR;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  soulgathering: boolean;
  armorproperties: Array<string>;
  i18n: Array<IArmorI18n>;
}

import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';
import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IArmorI18n extends II18nModel {
  locale: string;
  name: string;
}

export interface IArmor {
  id: string;
  dlcId?: string;
  events?: Array<string>;
  type: Type.ARMOR;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  soulgathering?: boolean;
  armorproperties: Array<string>;
  i18n: Array<{ dataValues: IArmorI18n }>;
}

export interface IRemoteArmor {
  dataValues: IArmor;
}

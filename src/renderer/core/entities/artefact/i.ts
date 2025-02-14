import type { Type, Rarity, Rune } from '@renderer/core/entities/item/enums';
import type { II18nModel } from '@renderer/core/entities/AbstractI18nEntity';

export interface IArtefactI18n extends II18nModel {
  locale: string;
  name: string;
}

export interface IArtefact {
  id: string;
  dlcId?: string;
  events?: Array<string>;
  type: Type.ARTEFACT;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  soulgathering: boolean;
  i18n: Array<{ dataValues: IArtefactI18n }>;
}

export interface IRemoteArtefact {
  dataValues: IArtefact;
}

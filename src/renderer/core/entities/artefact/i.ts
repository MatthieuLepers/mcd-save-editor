import type { Type, Rarity, Rune } from '@renderer/core/entities/item/enums';

export interface IArtefactI18n {
  locale: string;
  name: string;
}

export interface IArtefact {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: Type.ARTEFACT;
  rarity: Array<`${Rarity}`>;
  ancientHuntRunes: Array<`${Rune}`>;
  soulgathering: boolean;
  i18n: Array<IArtefactI18n>;
}

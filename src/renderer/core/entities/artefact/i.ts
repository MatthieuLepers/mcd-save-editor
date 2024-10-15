export interface IArtefactI18n {
  locale: string;
  name: string;
}

export interface IArtefact {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: 'Artefact';
  rarity: Array<'Common' | 'Rare' | 'Unique'>;
  ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;
  soulgathering: boolean;
  i18n: Array<IArtefactI18n>;
}

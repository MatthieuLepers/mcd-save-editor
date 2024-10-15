export interface IArmorI18n {
  locale: string;
  name: string;
}

export interface IArmor {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: 'Armor';
  rarity: Array<'Common' | 'Rare' | 'Unique'>;
  ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;
  soulgathering: boolean;
  armorproperties: Array<string>;
  i18n: Array<IArmorI18n>;
}

export interface IWeaponI18n {
  locale: string;
  name: string;
}

export interface IWeapon {
  id: string;
  dlcId: string | null;
  events: Array<string>;
  type: 'Melee' | 'Ranged';
  rarity: Array<'Common' | 'Rare' | 'Unique'>;
  ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;
  stats: Record<string, number>;
  soulgathering: boolean;
  activeEnchants: Array<string>;
  i18n: Array<IWeaponI18n>;
}

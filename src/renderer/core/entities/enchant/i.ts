export interface IEnchantI18n {
  locale: string;
  name: string;
  desc: string;
  level: [string, string, string];
}

export interface IEnchant {
  id: string;
  dlcId: string | null;
  type: Array<'Armor' | 'Melee' | 'Ranged'>;
  tier: 'Common' | 'Powerful';
  i18n: Array<IEnchantI18n>;
}

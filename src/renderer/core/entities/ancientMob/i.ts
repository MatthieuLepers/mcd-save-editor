export interface IAncientMobI18n {
  locale: string;
  name: string;
}

export interface IAncientMob {
  id: string;
  neededRunes: Array<string>;
  rewards: Array<string>;
  i18n: Array<IAncientMobI18n>;
}

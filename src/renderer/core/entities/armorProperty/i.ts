export interface IArmorPropertyI18n {
  locale: string;
  name: string;
}

export interface IArmorProperty {
  id: string;
  dlcId: string | null;
  i18n: Array<IArmorPropertyI18n>;
}

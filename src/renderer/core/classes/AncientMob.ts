import RuneList from '@renderer/core/classes/RuneList';

export interface IAncientMobData {
  name: string;
  neededRunes: Array<string>;
  image: string;
  rewards: Array<string>;
  i18n: Record<string, string>;
}

export default class AncientMob {
  declare name: string;

  declare neededRunes: Array<string>;

  declare image: string;

  declare rewards: Array<string>;

  declare i18n: Record<string, string>;

  constructor(public data: IAncientMobData) {
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key],
        set: (val) => { this.data[key] = val; },
      });
    });
  }

  get runeList(): RuneList {
    return new RuneList(this.neededRunes);
  }

  get groupedRunes(): Record<string, number> {
    return this.runeList.compressed;
  }
}

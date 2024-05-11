import { ArmorProperties } from '@renderer/core/data/Content';

export interface IArmorProperty {
  id: string;
  rarity: string;
}

export interface IArmorPropertyData {
  disabled?: boolean;
  name: string;
  i18n: Record<string, string>;
}

export default class ArmorPromerty {
  declare id: string;

  declare rarity: string;

  constructor(public data: IArmorProperty) {
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key],
        set: (value) => { this.data[key] = value; },
      });
    });
  }

  get armorPropertyData(): IArmorPropertyData {
    if (!ArmorProperties[this.id]) {
      return ArmorProperties.Unknown;
    }
    return ArmorProperties[this.id];
  }

  get armorPropertyIdentifier(): string {
    if (this.armorPropertyData.name !== 'Unknown') {
      return this.id;
    }
    return 'Unknown';
  }
}

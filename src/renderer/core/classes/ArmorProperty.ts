import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';
import type EntityArmorProperty from '../entities/armorProperty';

export interface IArmorProperty {
  id: string;
  rarity: string;
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

  get armorPropertyData(): EntityArmorProperty {
    if (!armorPropertiesStore.state.properties[this.id]) {
      return armorPropertiesStore.state.properties.Unknown;
    }
    return armorPropertiesStore.state.properties[this.id];
  }

  get armorPropertyIdentifier(): string {
    if (this.armorPropertyData.id !== 'Unknown') {
      return this.id;
    }
    return 'Unknown';
  }
}

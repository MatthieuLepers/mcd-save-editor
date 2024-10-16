import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';
import type ArmorProperty from '@renderer/core/entities/armorProperty';
import type { IGameArmorProperty } from '@renderer/core/entities/armorProperty/i';
import type { Rarity } from '@renderer/core/entities/item/enums';

export default class GameArmorPromerty extends AbstractEntity<IGameArmorProperty> {
  declare id: string;

  declare rarity: `${Rarity}`;

  constructor(data: IGameArmorProperty) {
    super(data, []);
  }

  get armorPropertyData(): ArmorProperty {
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

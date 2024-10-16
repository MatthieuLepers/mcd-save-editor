import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmor } from '@renderer/core/entities/armor/i';
import type ArmorProperty from '@renderer/core/entities/armorProperty';
import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import GameItem, { type IItem } from '@renderer/core/classes/Item';
import { shuffleArray } from '@renderer/core/utils';

export default class Armor extends AbstractI18nEntity<IArmor> {
  declare id: string;

  declare dlcId: string | null;

  declare events: Array<string>;

  declare type: 'Armor';

  declare rarity: Array<string>;

  declare ancientHuntRunes: Array<string>;

  declare soulgathering: boolean;

  constructor(data: IArmor) {
    super(data, ['armorproperties']);
  }

  get dlc(): Dlc {
    if (!this.dlcId) {
      return new Dlc({
        id: 'Minecrat Dungeons',
        releasedAt: new Date('2020-05-26'),
      });
    }
    return dlcsStore.state.dlcs[this.dlcId];
  }

  get armorproperties(): Array<ArmorProperty> {
    return (this.data.armorproperties ?? [])
      .map((propertyId) => armorPropertiesStore.state.properties[propertyId])
    ;
  }

  toGameData(inventoryIndex: number): GameItem {
    const obj: IItem = {
      inventoryIndex,
      power: 1,
      rarity: this.rarity[0],
      type: this.id,
      upgraded: false,
    };

    if (this.id === 'MysteryArmor') {
      obj.armorproperties = shuffleArray(this.armorproperties)
        .slice(0, 2)
        .map((armorProperty) => armorProperty.toGameData().data)
      ;
    } else {
      obj.armorproperties = this.armorproperties
        .map((armorProperty) => armorProperty.toGameData().data)
      ;
    }

    return new GameItem(obj);
  }
}

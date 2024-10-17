import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmor } from '@renderer/core/entities/armor/i';
import type ArmorProperty from '@renderer/core/entities/armorProperty';
import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import GameItem from '@renderer/core/entities/item/game';
import type { IGameItem } from '@renderer/core/entities/item/i';
import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';
import type Event from '@renderer/core/entities/event';
import { eventsStore } from '@renderer/core/entities/event/store';
import { image, shuffleArray } from '@renderer/core/utils';

export default class Armor extends AbstractI18nEntity<IArmor> {
  declare id: string;

  declare dlcId: string | null;

  declare type: Type.ARMOR;

  declare rarity: Array<`${Rarity}`>;

  declare ancientHuntRunes: Array<`${Rune}`>;

  declare soulgathering: boolean;

  constructor(data: IArmor) {
    super(data, ['events', 'armorproperties']);
  }

  get dlc(): Dlc {
    return dlcsStore.state.dlcs[this.dlcId!];
  }

  get events(): Array<Event> {
    return (this.data.events ?? [])
      .map((eventId) => eventsStore.state.events[eventId])
    ;
  }

  get armorproperties(): Array<ArmorProperty> {
    return (this.data.armorproperties ?? [])
      .map((propertyId) => armorPropertiesStore.state.properties[propertyId])
    ;
  }

  get image(): string {
    return image(`img/Items/Armors/${this.id}.png`);
  }

  toGameData(inventoryIndex: number): GameItem {
    const obj: IGameItem = {
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

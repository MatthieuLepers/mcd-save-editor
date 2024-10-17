import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeapon } from '@renderer/core/entities/weapon/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import GameItem from '@renderer/core/entities/item/game';
import type { Rarity, Rune, Type } from '@renderer/core/entities/item/enums';
import type Event from '@renderer/core/entities/event';
import { eventsStore } from '@renderer/core/entities/event/store';
import { image } from '@renderer/core/utils';

export default class Weapon extends AbstractI18nEntity<IWeapon> {
  declare id: string;

  declare dlcId: string | null;

  declare type: Exclude<Type, 'Armor' | 'Artefact'>;

  declare rarity: Array<`${Rarity}`>;

  declare ancientHuntRunes: Array<`${Rune}`>;

  declare stats: Record<string, number>;

  declare soulgathering: boolean;

  declare activeEnchants: Array<string>;

  constructor(data: IWeapon) {
    super(data, ['events']);
  }

  get dlc(): Dlc {
    return dlcsStore.state.dlcs[this.dlcId!];
  }

  get events(): Array<Event> {
    return (this.data.events ?? [])
      .map((eventId) => eventsStore.state.events[eventId])
    ;
  }

  get image(): string {
    return image(`img/Items/${this.type}Weapons/${this.id}.png`);
  }

  toGameData(inventoryIndex: number): GameItem {
    return new GameItem({
      inventoryIndex,
      power: 1,
      rarity: this.rarity[0],
      type: this.id,
      enchantments: [...Array(9).keys()].map(() => enchantsStore.actions.createRandomGameEnchantOfType(this.type).data),
      upgraded: false,
    });
  }
}

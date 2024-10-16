import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeapon } from '@renderer/core/entities/weapon/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import GameItem from '@renderer/core/classes/Item';

export default class Weapon extends AbstractI18nEntity<IWeapon> {
  declare id: string;

  declare dlcId: string;

  declare events: Array<string>;

  declare type: 'Melee' | 'Ranged';

  declare rarity: Array<'Common' | 'Rare' | 'Unique'>;

  declare ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;

  declare stats: Record<string, number>;

  declare soulgathering: boolean;

  declare activeEnchants: Array<string>;

  constructor(data: IWeapon) {
    super(data, []);
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

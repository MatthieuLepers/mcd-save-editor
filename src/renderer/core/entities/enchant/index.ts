import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IEnchant } from '@renderer/core/entities/enchant/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';

export default class Enchant extends AbstractI18nEntity<IEnchant> {
  declare id: string;

  declare dlcId: string | null;

  declare type: Array<'Armor' | 'Melee' | 'Ranged'>;

  declare tier: 'Common' | 'Powerful';

  constructor(data: IEnchant) {
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
}

import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IEnchant } from '@renderer/core/entities/enchant/i';
import type { Tier, Type } from '@renderer/core/entities/enchant/enums';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import { image } from '@renderer/core/utils';

export default class Enchant extends AbstractI18nEntity<IEnchant> {
  declare id: string;

  declare dlcId: string | null;

  declare type: Array<`${Type}`>;

  declare tier: `${Tier}`;

  constructor(data: IEnchant) {
    super(data, []);
  }

  get dlc(): Dlc {
    return dlcsStore.state.dlcs[this.dlcId!];
  }

  get image(): string {
    return image(`img/Enchants/${this.id}.png`);
  }
}

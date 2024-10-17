import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmorProperty } from '@renderer/core/entities/armorProperty/i';
import GameArmorPromerty from '@renderer/core/entities/armorProperty/game';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';

export default class ArmorProperty extends AbstractI18nEntity<IArmorProperty> {
  declare id: string;

  declare dlcId: string | null;

  constructor(data: IArmorProperty) {
    super(data, []);
  }

  get dlc(): Dlc {
    return dlcsStore.state.dlcs[this.dlcId!];
  }

  toGameData(): GameArmorPromerty {
    return new GameArmorPromerty({
      id: this.id,
      rarity: 'Common',
    });
  }
}

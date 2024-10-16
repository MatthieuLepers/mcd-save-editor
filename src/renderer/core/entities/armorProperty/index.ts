import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmorProperty } from '@renderer/core/entities/armorProperty/i';
import GameArmorPromerty from '@renderer/core/classes/ArmorProperty';

export default class ArmorProperty extends AbstractI18nEntity<IArmorProperty> {
  declare id: string;

  declare dlcId: string | null;

  constructor(data: IArmorProperty) {
    super(data, []);
  }

  toGameData(): GameArmorPromerty {
    return new GameArmorPromerty({
      id: this.id,
      rarity: 'Common',
    });
  }
}

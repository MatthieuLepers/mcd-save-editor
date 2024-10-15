import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmorProperty } from '@renderer/core/entities/armorProperty/i';

export default class ArmorProperty extends AbstractI18nEntity<IArmorProperty> {
  declare id: string;

  declare dlcId: string | null;

  constructor(data: IArmorProperty) {
    super(data, []);
  }
}

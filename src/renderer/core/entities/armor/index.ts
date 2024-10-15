import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArmor } from '@renderer/core/entities/armor/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';

export default class Armor extends AbstractI18nEntity<IArmor> {
  declare id: string;

  declare dlcId: string | null;

  declare events: Array<string>;

  declare type: 'Armor';

  declare rarity: Array<string>;

  declare ancientHuntRunes: Array<string>;

  declare soulgathering: boolean;

  declare armorproperties: Array<string>;

  constructor(data: IArmor) {
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

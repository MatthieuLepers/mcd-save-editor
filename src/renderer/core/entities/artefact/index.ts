import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArtefact } from '@renderer/core/entities/artefact/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import GameItem from '@renderer/core/entities/item/game';
import type { Type, Rarity, Rune } from '@renderer/core/entities/item/enums';
import { image } from '@renderer/core/utils';

export default class Artefact extends AbstractI18nEntity<IArtefact> {
  declare id: string;

  declare dlcId: string | null;

  declare events: Array<string>;

  declare type: Type.ARTEFACT;

  declare rarity: Array<`${Rarity}`>;

  declare ancientHuntRunes: Array<`${Rune}`>;

  declare soulgathering: boolean;

  constructor(data: IArtefact) {
    super(data, []);
  }

  get dlc(): Dlc {
    return dlcsStore.state.dlcs[this.dlcId];
  }

  get image(): string {
    return image(`img/Items/Artefacts/${this.id}.png`);
  }

  toGameData(inventoryIndex: number): GameItem {
    return new GameItem({
      inventoryIndex,
      power: 1,
      rarity: this.rarity[0],
      type: this.id,
      upgraded: false,
    });
  }
}

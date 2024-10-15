import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArtefact } from '@renderer/core/entities/artefact/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';

export default class Artefact extends AbstractI18nEntity<IArtefact> {
  declare id: string;

  declare dlcId: string | null;

  declare events: Array<string>;

  declare type: 'Artefact';

  declare rarity: Array<string>;

  declare ancientHuntRunes: Array<string>;

  declare soulgathering: boolean;

  constructor(data: IArtefact) {
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

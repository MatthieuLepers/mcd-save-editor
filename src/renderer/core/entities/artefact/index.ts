import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IArtefact } from '@renderer/core/entities/artefact/i';
import Dlc from '@renderer/core/entities/dlc';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import GameItem from '@renderer/core/entities/item/game';
import type { Type, Rarity, Rune } from '@renderer/core/entities/item/enums';
import type Event from '@renderer/core/entities/event';
import { eventsStore } from '@renderer/core/entities/event/store';
import { image } from '@renderer/core/utils';

export default class Artefact extends AbstractI18nEntity<IArtefact> {
  declare id: string;

  declare dlcId: string | null;

  declare type: Type.ARTEFACT;

  declare rarity: Array<`${Rarity}`>;

  declare ancientHuntRunes: Array<`${Rune}`>;

  declare soulgathering: boolean;

  constructor(data: IArtefact) {
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

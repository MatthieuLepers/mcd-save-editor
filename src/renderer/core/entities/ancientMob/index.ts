import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IAncientMob } from '@renderer/core/entities/ancientMob/i';
import { image } from '@renderer/core/utils';
import RuneList from '@renderer/core/classes/RuneList';

export default class AncientMob extends AbstractI18nEntity<IAncientMob> {
  declare id: string;

  declare neededRunes: Array<string>;

  declare rewards: Array<string>;

  constructor(data: IAncientMob) {
    super(data, []);
  }

  get image(): string {
    return image(`img/AncientMobs/${this.id}.png`);
  }

  get runeList(): RuneList {
    return new RuneList(this.neededRunes);
  }

  get groupedRunes(): Record<string, number> {
    return this.runeList.compressed;
  }
}

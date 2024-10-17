import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import { Tier } from '@renderer/core/entities/enchant/enums';
import type EntityEnchant from '@renderer/core/entities/enchant';
import type { IGameEnchant } from '@renderer/core/entities/enchant/i';

export default class GameEnchant extends AbstractEntity<IGameEnchant> {
  declare id: string;

  declare investedPoints: number;

  declare level: number;

  public netherite: boolean = false;

  constructor(
    data: IGameEnchant,
    public isGilded?: boolean,
  ) {
    super(data, []);
  }

  static get UNSET(): GameEnchant {
    return new GameEnchant({
      id: 'Unset',
      investedPoints: 0,
      level: 0,
    });
  }

  get enchantData(): EntityEnchant {
    if (!enchantsStore.state.enchants[this.id]) {
      return enchantsStore.state.enchants.Unknown;
    }
    return enchantsStore.state.enchants[this.id];
  }

  get enchantmentPointsInvested(): number {
    if (this.netherite) return 0;
    const { tier } = this.enchantData;
    const offset = (tier === Tier.COMMON ? 0 : 1) + (this.isGilded ? 1 : 0);

    return [...Array(this.level).keys()]
      .map((t) => t + 1 + offset)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  get enchantIdentifier(): string {
    if (this.enchantData.type) {
      return this.id;
    }
    return 'Unknown';
  }

  getInvestmentCostForLevel(level: number): number {
    if (this.netherite) return 0;
    const { tier } = this.enchantData;
    const offset = (tier === Tier.COMMON ? 0 : 1) + (this.isGilded ? 1 : 0);

    return [...Array(3).keys()]
      .map((t) => t + 1 + offset)[level - 1]
    ;
  }

  setNetherite(netherite: boolean) {
    this.netherite = netherite;
  }

  toString(): string {
    return this.enchantData.getI18n('name');
  }
}

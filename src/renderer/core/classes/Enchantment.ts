import { EnchantmentTierEnum } from '@renderer/core/classes/enums/EnchantmentTierEnum';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import type EntityEnchant from '@renderer/core/entities/enchant';

export interface IEnchantment {
  id: string;
  investedPoints: number;
  level: number;
}

export interface IEnchantmentData {
  disabled?: boolean;
  name: string;
  type: Array<string>;
  tier: string;
  image: string;
  soulgathering?: boolean;
  i18n: Record<string, {
    name: string;
    desc: string;
    level: Array<string>;
  }>;
}

export default class Enchantment {
  declare id: string;

  declare investedPoints: number;

  declare level: number;

  public netherite: boolean = false;

  constructor(
    public data: IEnchantment,
    public isGilded?: boolean,
  ) {
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key],
        set: (value) => { this.data[key] = value; },
      });
    });
  }

  static get UNSET(): Enchantment {
    return new Enchantment({ id: 'Unset', investedPoints: 0, level: 0 });
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
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1) + (this.isGilded ? 1 : 0);

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
    const offset = (tier === EnchantmentTierEnum.COMMON ? 0 : 1) + (this.isGilded ? 1 : 0);

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

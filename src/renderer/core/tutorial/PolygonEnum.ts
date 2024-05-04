const OFFSET_X = 48;
const OFFSET_Y = -30;

export type Polygon = Array<Array<number>>;

export default class PolygonEnum {
  static get GEAR_MELEE(): Polygon {
    return [
      [28 + OFFSET_X, 223 + OFFSET_Y],
      [102 + OFFSET_X, 223 + OFFSET_Y],
      [102 + OFFSET_X, 297 + OFFSET_Y],
      [28 + OFFSET_X, 297 + OFFSET_Y],
    ];
  }

  static get GEAR_ARMOR(): Polygon {
    return [
      [135 + OFFSET_X, 177 + OFFSET_Y],
      [205 + OFFSET_X, 177 + OFFSET_Y],
      [205 + OFFSET_X, 247 + OFFSET_Y],
      [135 + OFFSET_X, 247 + OFFSET_Y],
    ];
  }

  static get GEAR_RANGED(): Polygon {
    return [
      [245 + OFFSET_X, 207 + OFFSET_Y],
      [315 + OFFSET_X, 207 + OFFSET_Y],
      [315 + OFFSET_X, 277 + OFFSET_Y],
      [245 + OFFSET_X, 277 + OFFSET_Y],
    ];
  }

  static get HOTBAR_SLOT1(): Polygon {
    return [
      [45 + OFFSET_X, 470 + OFFSET_Y],
      [115 + OFFSET_X, 470 + OFFSET_Y],
      [115 + OFFSET_X, 540 + OFFSET_Y],
      [45 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  static get HOTBAR_SLOT2(): Polygon {
    return [
      [135 + OFFSET_X, 470 + OFFSET_Y],
      [205 + OFFSET_X, 470 + OFFSET_Y],
      [205 + OFFSET_X, 540 + OFFSET_Y],
      [135 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  static get HOTBAR_SLOT3(): Polygon {
    return [
      [225 + OFFSET_X, 470 + OFFSET_Y],
      [295 + OFFSET_X, 470 + OFFSET_Y],
      [295 + OFFSET_X, 540 + OFFSET_Y],
      [225 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  static INVENTORY_SLOT(index: number): Polygon {
    const offset = {
      x: (((index - 1) % 3) * 90) + (((index - 1) % 3) * 6),
      y: (Math.floor((index - 1) / 3) * 90) + (Math.floor((index - 1) / 3) * 6),
    };
    return [
      [359 + offset.x + OFFSET_X, 200 + offset.y + OFFSET_Y],
      [449 + offset.x + OFFSET_X, 200 + offset.y + OFFSET_Y],
      [449 + offset.x + OFFSET_X, 290 + offset.y + OFFSET_Y],
      [359 + offset.x + OFFSET_X, 290 + offset.y + OFFSET_Y],
    ];
  }

  static get SELECTED_ENCHANTMENT(): Polygon {
    return [
      [735 + OFFSET_X, 467 + OFFSET_Y],
      [746.5 + OFFSET_X, 476.5 + OFFSET_Y],
      [751.7 + OFFSET_X, 470.7 + OFFSET_Y],
      [766 + OFFSET_X, 485.4 + OFFSET_Y],
      [762.3 + OFFSET_X, 491.4 + OFFSET_Y],
      [771 + OFFSET_X, 502 + OFFSET_Y],
      [735 + OFFSET_X, 539 + OFFSET_Y],
      [698 + OFFSET_X, 502 + OFFSET_Y],
      [735 + OFFSET_X, 467 + OFFSET_Y],
    ];
  }

  static get ENCHANTMENT_SLOT1(): Polygon {
    return [
      [710 + OFFSET_X, 482 + OFFSET_Y],
      [731 + OFFSET_X, 503 + OFFSET_Y],
      [710 + OFFSET_X, 524 + OFFSET_Y],
      [690 + OFFSET_X, 502 + OFFSET_Y],
    ];
  }

  static get ENCHANTMENT_SLOT2(): Polygon {
    return [
      [729 + OFFSET_X, 511 + OFFSET_Y],
      [750 + OFFSET_X, 531 + OFFSET_Y],
      [729 + OFFSET_X, 552 + OFFSET_Y],
      [708 + OFFSET_X, 531 + OFFSET_Y],
    ];
  }

  static get ENCHANTMENT_SLOT3(): Polygon {
    return [
      [762 + OFFSET_X, 483 + OFFSET_Y],
      [782 + OFFSET_X, 503 + OFFSET_Y],
      [762 + OFFSET_X, 523 + OFFSET_Y],
      [742 + OFFSET_X, 503 + OFFSET_Y],
    ];
  }

  static NETHERITE_ENCHANTMENT_SLOT(): Polygon {
    const gildedEnchant = document.querySelector('.MCDGildedEnchant')!;
    const { x, y, width, height } = gildedEnchant.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  static ITEM_SELECTOR(): Polygon {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter')!;
    const { x, y, width, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  static ITEM_SELECTOR_DROPDOWN(): Polygon {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter')!;
    const { x, y, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 301 + OFFSET_Y],
      [x, y + height + 301 + OFFSET_Y],
    ];
  }

  static ITEM_RARITY_LABEL(): Polygon {
    const itemRarityLabel = document.querySelector('.MCDRarityLabel')!;
    const { x, y, width, height } = itemRarityLabel.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  static ITEM_POWER_LABEL(): Polygon {
    const itemPowerLabel = document.querySelector('.MCDItemTitlePower')!;
    const { x, y, width, height } = itemPowerLabel.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_SELECTOR(): Polygon {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect')!;
    const { x, y, width, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x, (y - 3) + OFFSET_Y],
      [x + width + 10, (y - 3) + OFFSET_Y],
      [x + width + 10, y + height + 3 + OFFSET_Y],
      [x, y + height + 3 + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_SELECTOR_DROPDOWN(): Polygon {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect')!;
    const { x, y, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 271 + OFFSET_Y],
      [x, y + height + 271 + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_TIER_LIST(): Polygon {
    const enchantTierList = document.querySelector('.TierContainer')!;
    const { x, y, width, height } = enchantTierList.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width + 17, y + OFFSET_Y],
      [x + width + 17, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_EDITOR_CLOSE_BUTTON(): Polygon {
    const closeButton = document.querySelector('.MCDEnchantmentEditor h2 .MCDButton')!;
    const { x, y, width, height } = closeButton.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }
}

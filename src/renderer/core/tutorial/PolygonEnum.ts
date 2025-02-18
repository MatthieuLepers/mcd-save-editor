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
      [734 + OFFSET_X, 459 + OFFSET_Y - 22],
      [745.5 + OFFSET_X, 468.5 + OFFSET_Y - 22],
      [750.7 + OFFSET_X, 462.7 + OFFSET_Y - 22],
      [765 + OFFSET_X, 477.4 + OFFSET_Y - 22],
      [761.3 + OFFSET_X, 483.4 + OFFSET_Y - 22],
      [770 + OFFSET_X, 496 + OFFSET_Y - 22],
      [734 + OFFSET_X, 531 + OFFSET_Y - 22],
      [697 + OFFSET_X, 496 + OFFSET_Y - 22],
      [734 + OFFSET_X, 459 + OFFSET_Y - 22],
    ];
  }

  static get ENCHANTMENT_SLOT1(): Polygon {
    return [
      [709 + OFFSET_X, 473 + OFFSET_Y - 20],
      [730 + OFFSET_X, 494 + OFFSET_Y - 20],
      [709 + OFFSET_X, 515 + OFFSET_Y - 20],
      [689 + OFFSET_X, 494 + OFFSET_Y - 20],
    ];
  }

  static get ENCHANTMENT_SLOT2(): Polygon {
    return [
      [735 + OFFSET_X, 499 + OFFSET_Y - 20],
      [756 + OFFSET_X, 519 + OFFSET_Y - 20],
      [735 + OFFSET_X, 540 + OFFSET_Y - 20],
      [714 + OFFSET_X, 519 + OFFSET_Y - 20],
    ];
  }

  static get ENCHANTMENT_SLOT3(): Polygon {
    return [
      [762 + OFFSET_X, 483 + OFFSET_Y - 20],
      [782 + OFFSET_X, 503 + OFFSET_Y - 20],
      [762 + OFFSET_X, 523 + OFFSET_Y - 20],
      [742 + OFFSET_X, 503 + OFFSET_Y - 20],
    ];
  }

  static NETHERITE_ENCHANTMENT_SLOT(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const gildedEnchant = document.querySelector('.MCDGildedEnchant')!;
    const { x, y, width, height } = gildedEnchant.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }

  static ITEM_SELECTOR(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter')!;
    const { x, y, width, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }

  static ITEM_SELECTOR_DROPDOWN(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter')!;
    const { x, y, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + height + 9 + OFFSET_Y],
      [x - appBCR.x + 300, y - appBCR.y + height + 9 + OFFSET_Y],
      [x - appBCR.x + 300, y - appBCR.y + height + 301 + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + 301 + OFFSET_Y],
    ];
  }

  static ITEM_RARITY_LABEL(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const itemRarityLabel = document.querySelector('.MCDRarityLabel')!;
    const { x, y, width, height } = itemRarityLabel.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }

  static ITEM_POWER_LABEL(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const itemPowerLabel = document.querySelector('.MCDItemTitlePower')!;
    const { x, y, width, height } = itemPowerLabel.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_SELECTOR(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect')!;
    const { x, y, width, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x - appBCR.x, (y - appBCR.y - 3) + OFFSET_Y],
      [x - appBCR.x + width + 10, (y - appBCR.y - 3) + OFFSET_Y],
      [x - appBCR.x + width + 10, y - appBCR.y + height + 3 + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + 3 + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_SELECTOR_DROPDOWN(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect')!;
    const { x, y, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + height + 9 + OFFSET_Y],
      [x - appBCR.x + 300, y - appBCR.y + height + 9 + OFFSET_Y],
      [x - appBCR.x + 300, y - appBCR.y + height + 271 + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + 271 + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_TIER_LIST(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const enchantTierList = document.querySelector('.TierContainer')!;
    const { x, y, width, height } = enchantTierList.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width + 17, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width + 17, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }

  static ENCHANTMENT_EDITOR_CLOSE_BUTTON(): Polygon {
    const app = document.getElementById('app')!;
    const appBCR = app.getBoundingClientRect();
    const closeButton = document.querySelector('.MCDEnchantmentEditor h2 .MCDButton')!;
    const { x, y, width, height } = closeButton.getBoundingClientRect();
    return [
      [x - appBCR.x, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + OFFSET_Y],
      [x - appBCR.x + width, y - appBCR.y + height + OFFSET_Y],
      [x - appBCR.x, y - appBCR.y + height + OFFSET_Y],
    ];
  }
}

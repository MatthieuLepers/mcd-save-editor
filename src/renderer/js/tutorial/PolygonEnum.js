const OFFSET_X = 48;
const OFFSET_Y = -30;

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class PolygonEnum {
  /**
   * @return {Array[]}
   */
  static get GEAR_MELEE() {
    return [
      [25 + OFFSET_X, 207 + OFFSET_Y],
      [95 + OFFSET_X, 207 + OFFSET_Y],
      [95 + OFFSET_X, 277 + OFFSET_Y],
      [25 + OFFSET_X, 277 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get GEAR_ARMOR() {
    return [
      [135 + OFFSET_X, 177 + OFFSET_Y],
      [205 + OFFSET_X, 177 + OFFSET_Y],
      [205 + OFFSET_X, 247 + OFFSET_Y],
      [135 + OFFSET_X, 247 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get GEAR_RANGED() {
    return [
      [245 + OFFSET_X, 207 + OFFSET_Y],
      [315 + OFFSET_X, 207 + OFFSET_Y],
      [315 + OFFSET_X, 277 + OFFSET_Y],
      [245 + OFFSET_X, 277 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT1() {
    return [
      [45 + OFFSET_X, 470 + OFFSET_Y],
      [115 + OFFSET_X, 470 + OFFSET_Y],
      [115 + OFFSET_X, 540 + OFFSET_Y],
      [45 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT2() {
    return [
      [135 + OFFSET_X, 470 + OFFSET_Y],
      [205 + OFFSET_X, 470 + OFFSET_Y],
      [205 + OFFSET_X, 540 + OFFSET_Y],
      [135 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT3() {
    return [
      [225 + OFFSET_X, 470 + OFFSET_Y],
      [295 + OFFSET_X, 470 + OFFSET_Y],
      [295 + OFFSET_X, 540 + OFFSET_Y],
      [225 + OFFSET_X, 540 + OFFSET_Y],
    ];
  }

  /**
   * @param {Number} index - [1, 12]
   * @return {Array[]}
   */
  static INVENTORY_SLOT(index) {
    const offset = {
      x: (((index - 1) % 3) * 90) + (((index - 1) % 3) * 6),
      y: (Math.floor((index - 1) / 3) * 90) + (Math.floor((index - 1) / 3) * 6),
    };
    return [
      [359 + offset.x + OFFSET_X, 179 + offset.y + OFFSET_Y],
      [449 + offset.x + OFFSET_X, 179 + offset.y + OFFSET_Y],
      [449 + offset.x + OFFSET_X, 269 + offset.y + OFFSET_Y],
      [359 + offset.x + OFFSET_X, 269 + offset.y + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get SELECTED_ENCHANTMENT() {
    return [
      [735 + OFFSET_X, 435 + OFFSET_Y],
      [746.5 + OFFSET_X, 444.5 + OFFSET_Y],
      [751.7 + OFFSET_X, 438.7 + OFFSET_Y],
      [766 + OFFSET_X, 453.4 + OFFSET_Y],
      [762.3 + OFFSET_X, 459.4 + OFFSET_Y],
      [771 + OFFSET_X, 470 + OFFSET_Y],
      [735 + OFFSET_X, 507 + OFFSET_Y],
      [698 + OFFSET_X, 470 + OFFSET_Y],
      [735 + OFFSET_X, 435 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   * old M0,0V563H1048V0z M758,420L778,440L758,460L738,440
   * new M0,0V563H1048V0z M758,419L779,440L758,461L738,439
   */
  static get ENCHANTMENT_SLOT1() {
    return [
      [710 + OFFSET_X, 449 + OFFSET_Y],
      [731 + OFFSET_X, 470 + OFFSET_Y],
      [710 + OFFSET_X, 491 + OFFSET_Y],
      [690 + OFFSET_X, 469 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   * old M0,0V563H1048V0z M783,446L803,466L783,486L763,466
   * new M0,0V563H1048V0z M784,445L805,466L784,487L763,466
   */
  static get ENCHANTMENT_SLOT2() {
    return [
      [736 + OFFSET_X, 476 + OFFSET_Y],
      [757 + OFFSET_X, 496 + OFFSET_Y],
      [736 + OFFSET_X, 517 + OFFSET_Y],
      [715 + OFFSET_X, 496 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT3() {
    return [
      [762 + OFFSET_X, 450 + OFFSET_Y],
      [782 + OFFSET_X, 470 + OFFSET_Y],
      [762 + OFFSET_X, 490 + OFFSET_Y],
      [742 + OFFSET_X, 470 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static NETHERITE_ENCHANTMENT_SLOT() {
    const gildedEnchant = document.querySelector('.MCDGildedEnchant');
    const { x, y, width, height } = gildedEnchant.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_SELECTOR() {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter');
    const { x, y, width, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_SELECTOR_DROPDOWN() {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter');
    const { x, y, height } = itemSelectOuter.getBoundingClientRect();
    return [
      [x, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 301 + OFFSET_Y],
      [x, y + height + 301 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_RARITY_LABEL() {
    const itemRarityLabel = document.querySelector('.MCDRarityLabel');
    const { x, y, width, height } = itemRarityLabel.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_POWER_LABEL() {
    const itemPowerLabel = document.querySelector('.MCDItemTitlePower');
    const { x, y, width, height } = itemPowerLabel.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_SELECTOR() {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect');
    const { x, y, width, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x, (y - 3) + OFFSET_Y],
      [x + width + 10, (y - 3) + OFFSET_Y],
      [x + width + 10, y + height + 3 + OFFSET_Y],
      [x, y + height + 3 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_SELECTOR_DROPDOWN() {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect');
    const { x, y, height } = enchantSelectOuter.getBoundingClientRect();
    return [
      [x, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 9 + OFFSET_Y],
      [x + 300, y + height + 271 + OFFSET_Y],
      [x, y + height + 271 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_TIER_LIST() {
    const enchantTierList = document.querySelector('.TierContainer');
    const { x, y, width, height } = enchantTierList.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width + 17, y + OFFSET_Y],
      [x + width + 17, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_EDITOR_CLOSE_BUTTON() {
    const closeButton = document.querySelector('.MCDEnchantmentEditor h2 .MCDButton');
    const { x, y, width, height } = closeButton.getBoundingClientRect();
    return [
      [x, y + OFFSET_Y],
      [x + width, y + OFFSET_Y],
      [x + width, y + height + OFFSET_Y],
      [x, y + height + OFFSET_Y],
    ];
  }
}

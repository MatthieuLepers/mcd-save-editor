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
      [735 + OFFSET_X, 425 + OFFSET_Y],
      [748.5 + OFFSET_X, 438.5 + OFFSET_Y],
      [752.7 + OFFSET_X, 434.7 + OFFSET_Y],
      [766 + OFFSET_X, 448.4 + OFFSET_Y],
      [762.3 + OFFSET_X, 452.4 + OFFSET_Y],
      [775 + OFFSET_X, 465 + OFFSET_Y],
      [735 + OFFSET_X, 505 + OFFSET_Y],
      [695 + OFFSET_X, 465 + OFFSET_Y],
      [735 + OFFSET_X, 425 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT1() {
    return [
      [711 + OFFSET_X, 445 + OFFSET_Y],
      [731 + OFFSET_X, 465 + OFFSET_Y],
      [711 + OFFSET_X, 485 + OFFSET_Y],
      [691 + OFFSET_X, 465 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT2() {
    return [
      [736 + OFFSET_X, 471 + OFFSET_Y],
      [756 + OFFSET_X, 491 + OFFSET_Y],
      [736 + OFFSET_X, 511 + OFFSET_Y],
      [716 + OFFSET_X, 491 + OFFSET_Y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT3() {
    return [
      [763 + OFFSET_X, 445 + OFFSET_Y],
      [783 + OFFSET_X, 465 + OFFSET_Y],
      [763 + OFFSET_X, 485 + OFFSET_Y],
      [743 + OFFSET_X, 465 + OFFSET_Y],
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

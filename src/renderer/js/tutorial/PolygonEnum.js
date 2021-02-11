/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class PolygonEnum {
  /**
   * @return {Array[]}
   */
  static get GEAR_MELEE() {
    return [[25, 177], [95, 177], [95, 247], [25, 247]];
  }

  /**
   * @return {Array[]}
   */
  static get GEAR_ARMOR() {
    return [[135, 147], [205, 147], [205, 217], [135, 217]];
  }

  /**
   * @return {Array[]}
   */
  static get GEAR_RANGED() {
    return [[245, 177], [315, 177], [315, 247], [245, 247]];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT1() {
    return [[45, 440], [115, 440], [115, 510], [45, 510]];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT2() {
    return [[135, 440], [205, 440], [205, 510], [135, 510]];
  }

  /**
   * @return {Array[]}
   */
  static get HOTBAR_SLOT3() {
    return [[225, 440], [295, 440], [295, 510], [225, 510]];
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
      [359 + offset.x, 149 + offset.y],
      [449 + offset.x, 149 + offset.y],
      [449 + offset.x, 239 + offset.y],
      [359 + offset.x, 239 + offset.y],
    ];
  }

  /**
   * @return {Array[]}
   */
  static get SELECTED_ENCHANTMENT() {
    return [[735, 395], [748.5, 408.5], [752.7, 404.7], [766, 418.4], [762.3, 422.4], [775, 435], [735, 475], [695, 435], [735, 395]];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT1() {
    return [[711, 415], [731, 435], [711, 455], [691, 435]];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT2() {
    return [[736, 441], [756, 461], [736, 481], [716, 461]];
  }

  /**
   * @return {Array[]}
   */
  static get ENCHANTMENT_SLOT3() {
    return [[763, 415], [783, 435], [763, 455], [743, 435]];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_SELECTOR() {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter');
    const { x, y, width, height } = itemSelectOuter.getBoundingClientRect();
    return [[x, y - 30], [x + width, y - 30], [x + width, (y + height + 6) - 30], [x, (y + height + 6) - 30]];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_SELECTOR_DROPDOWN() {
    const itemSelectOuter = document.querySelector('.MCDItemSelectOuter');
    const { x, y, height } = itemSelectOuter.getBoundingClientRect();
    return [[x, (y + height) - 21], [x + 300, (y + height) - 21], [x + 300, y + height + 271], [x, y + height + 271]];
  }

  /**
   * @return {Array[]}
   */
  static ITEM_RARITY_LABEL() {
    const itemRarityLabel = document.querySelector('.MCDRarityLabel');
    const { x, y, width, height } = itemRarityLabel.getBoundingClientRect();
    return [[x, y - 30], [x + width, y - 30], [x + width, (y + height) - 30], [x, (y + height) - 30]];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_SELECTOR() {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect');
    const { x, y, width, height } = enchantSelectOuter.getBoundingClientRect();
    return [[x, y - 33], [x + width + 10, y - 33], [x + width + 10, (y + height + 6) - 33], [x, (y + height + 6) - 33]];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_SELECTOR_DROPDOWN() {
    const enchantSelectOuter = document.querySelector('.MCDEnchantSelect');
    const { x, y, height } = enchantSelectOuter.getBoundingClientRect();
    return [[x, (y + height) - 21], [x + 300, (y + height) - 21], [x + 300, y + height + 241], [x, y + height + 241]];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_TIER_LIST() {
    const enchantTierList = document.querySelector('.TierContainer');
    const { x, y, width, height } = enchantTierList.getBoundingClientRect();
    return [[x, y - 30], [x + width + 17, y - 30], [x + width + 17, (y + height) - 30], [x, (y + height) - 30]];
  }

  /**
   * @return {Array[]}
   */
  static ENCHANTMENT_EDITOR_CLOSE_BUTTON() {
    const closeButton = document.querySelector('.MCDEnchantmentEditor h2 .MCDButton');
    const { x, y, width, height } = closeButton.getBoundingClientRect();
    return [[x, y - 30], [x + width, y - 30], [x + width, (y + height) - 30], [x, (y + height) - 30]];
  }
}

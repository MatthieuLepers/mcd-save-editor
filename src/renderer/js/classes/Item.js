import Enchantment from './Enchantment';
import ArmorProperty from './ArmorProperty';

import ItemTypeEnum from './enums/ItemTypeEnum';
import RarityEnum from './enums/RarityEnum';

import ItemsData from '../data/Items';
import GlobalStore from '../stores/GlobalStore';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Item {
  /**
   * @constructor
   * @param {Object[]} data
   */
  constructor(data) {
    this.$data = data;
  }

  /**
   * @return {Object}
   */
  get itemData() {
    if (!ItemsData[this.$data.type]) {
      return ItemsData.Unknown;
    }
    return ItemsData[this.$data.type];
  }

  /**
   * @return {String}
   */
  get itemType() {
    if (this.itemData.type) {
      return this.itemData.type;
    } else if (this.$data.armorproperties) {
      return ItemTypeEnum.ARMOR;
    } else if (this.$data.enchantments) {
      const [[type]] = this.enchantments.filter(ench => ench.enchantData.type.length === 1);
      return type;
    }
    return ItemTypeEnum.ARTEFACT;
  }

  /**
   * @return {String}
   */
  get itemIdentifier() {
    if (this.itemData.type) {
      return this.$data.type;
    }
    return 'Unknown';
  }

  /**
   * @return {Boolean}
   */
  isGear() {
    return !!this.$data.equipmentSlot && this.$data.equipmentSlot.indexOf('Gear') >= 0;
  }

  /**
   * @return {Boolean}
   */
  isHotbar() {
    return !!this.$data.equipmentSlot && this.$data.equipmentSlot.indexOf('Hotbar') >= 0;
  }

  /**
   * @return {Boolean}
   */
  isEquipped() {
    return this.isGear() || this.isHotbar();
  }

  /**
   * @return {Boolean}
   */
  isCrossbow() {
    return this.$data.type.toLowerCase().indexOf('crossbow') >= 0;
  }

  /**
   * @return {Boolean}
   */
  isEnchanted() {
    return this.enchantmentPointsInvested > 0;
  }

  /**
   * @return {Boolean}
   */
  isCommon() {
    return this.$data.rarity === RarityEnum.COMMON;
  }

  /**
   * @return {Boolean}
   */
  isRare() {
    return this.$data.rarity === RarityEnum.RARE;
  }

  /**
   * @return {Boolean}
   */
  isUnique() {
    return this.$data.rarity === RarityEnum.UNIQUE;
  }

  /**
   * @return {Boolean}
   */
  isMelee() {
    return this.itemData.type === ItemTypeEnum.MELEE;
  }

  /**
   * @return {Boolean}
   */
  isArmor() {
    return this.itemData.type === ItemTypeEnum.ARMOR;
  }

  /**
   * @return {Boolean}
   */
  isRanged() {
    return this.itemData.type === ItemTypeEnum.RANGED;
  }

  /**
   * @return {Boolean}
   */
  isArtefact() {
    return this.itemData.type === ItemTypeEnum.ARTEFACT;
  }

  /**
   * @return {String}
   */
  get gearType() {
    return this.$data.equipmentSlot.replace('Gear', '');
  }

  /**
   * @param {String} type
   */
  set gearType(type) {
    this.$data.equipmentSlot = `${type}Gear`;
  }

  /**
   * @return {Number}
   */
  get hotbarSlot() {
    return parseInt(this.$data.equipmentSlot.replace('HotbarSlot', ''), 10);
  }

  /**
   * @param {Number} slot
   */
  set hotbarSlot(slot) {
    this.$data.equipmentSlot = `HotbarSlot${slot}`;
  }

  /**
   * @return {Number}
   */
  get powerLevel() {
    return Math.floor((this.$data.power - 1) * 10) + 1;
  }

  /**
   * @param {Number}
   */
  set powerLevel(powerLevel) {
    const currentPower = this.$data.power;
    const newPower = ((powerLevel - 1) / 10) + 1;
    this.$data.power = ((newPower * 10) + ((currentPower * 10) % 1)) / 10;
  }

  /**
   * @return {Number}
   */
  get enchantmentPointsInvested() {
    return this.enchantments
      .reduce((acc, enchantment) => acc + enchantment.enchantmentPointsInvested, 0)
    ;
  }

  /**
   * @return {Enchantment[]}
   */
  get enchantments() {
    return (this.$data.enchantments || [])
      .map(enchantmentData => new Enchantment(enchantmentData))
    ;
  }

  /**
   * @return {ArmorProperty[]}
   */
  get armorproperties() {
    return (this.$data.armorproperties || [])
      .map(armorPropertyData => new ArmorProperty(armorPropertyData))
    ;
  }

  /**
   * @param {String} itemData
   */
  convertTo(itemData) {
    const { type } = this.itemData.type;
    const itemType = itemData.type;

    this.$data.type = itemData.name;
    [this.$data.rarity] = itemData.rarity;
    this.$data.upgraded = false;

    if (itemType === ItemTypeEnum.ARTEFACT && this.$data.enchantments) {
      delete this.$data.enchantments;
    }
    if (itemType !== ItemTypeEnum.ARTEFACT) {
      this.$data.enchantments = [...Array(9).keys()].map(() => Enchantment.UNSET.$data);
    }
    if (itemType !== ItemTypeEnum.ARMOR && type !== ItemTypeEnum.ARMOR) {
      delete this.$data.armorproperties;
    }
    if (itemType === ItemTypeEnum.ARMOR) {
      if (itemData.name === 'MysteryArmor') {
        const possibleProperties = itemData.armorproperties.map(prop => ({ id: prop, rarity: RarityEnum.COMMON }));
        possibleProperties.sort(() => 0.5 - Math.random());
        this.$data.armorproperties = possibleProperties.slice(0, 3);
      } else {
        this.$data.armorproperties = itemData.armorproperties.map(prop => ({ id: prop, rarity: RarityEnum.COMMON }));
      }
    }
  }

  equip() {
    const { type } = this.itemData;
    let equipedItem = null;

    delete this.$data.inventoryIndex;
    if (type !== ItemTypeEnum.ARTEFACT) {
      [equipedItem] = GlobalStore.selectedCharacter.inventory.gears.filter(item => item && item.gearType === type);
      this.gearType = type;
    } else {
      const equipedSlots = GlobalStore.selectedCharacter.inventory.hotbar.map(item => (item ? item.hotbarSlot : null));
      const [emptySlot] = [1, 2, 3].filter(slot => equipedSlots.indexOf(slot) < 0);
      const oldSelectedItemValid = GlobalStore.$oldSelectedItem && GlobalStore.$oldSelectedItem.isArtefact();
      const slot = emptySlot || (oldSelectedItemValid && GlobalStore.$oldSelectedItem.hotbarSlot) || 1;

      [equipedItem] = GlobalStore.selectedCharacter.inventory.hotbar.filter(item => item && item.hotbarSlot === slot);
      this.hotbarSlot = slot;
    }
    if (equipedItem) {
      equipedItem.unequip();
    } else {
      GlobalStore.selectedCharacter.inventory.checkIntegrity();
    }
  }

  unequip() {
    this.$data.inventoryIndex = 0;
    delete this.$data.equipmentSlot;

    GlobalStore.selectedCharacter.inventory.checkIntegrity();
  }
}
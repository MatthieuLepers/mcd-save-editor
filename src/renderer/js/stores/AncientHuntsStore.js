import Item from '../classes/Item';
import RuneSequence from '../classes/RuneSequence';
import ArmorItemsData from '../data/_Armors';
import MeleeItemsData from '../data/_MeleeWeapons';
import RangedItemsData from '../data/_RangedWeapons';
import EnchantsData from '../data/Enchants';
import ItemsData from '../data/Items';
import ItemTypeEnum from '../classes/enums/ItemTypeEnum';

/**
 * @param {Array} array
 * @return {Array}
 */
function $shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * @param {String} type
 * @return {Object}
 */
function $createRandomEnchantmentByType(type) {
  const [enchant] = $shuffleArray(Object.values(EnchantsData)
    .filter(data => !data.disabled && data.type.includes(type) && (!data.activeEnchants || !data.activeEnchants.includes(data.name))),
  );
  return { id: enchant.name, level: 0 };
}

/**
 * @param {Object} itemData
 * @return {Item}
 */
function $createItem(itemData, index) {
  const itemObj = {
    inventoryIndex: index,
    power: 15,
    rarity: itemData.rarity[0],
    type: itemData.name,
    upgraded: false,
  };
  if (itemData.type !== 'Artefact') {
    itemObj.enchantments = [...Array(9).keys()].map(() => $createRandomEnchantmentByType(itemData.type));
  }
  if (itemData.type === 'Armor') {
    itemObj.armorproperties = itemData.armorproperties.map(prop => ({ id: prop, rarity: 'Common' }));
  }
  return new Item(itemObj);
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class AncientHuntsStore {
  /**
   * @constructor
   */
  constructor() {
    this.ancientMobList = [];
  }

  /**
   * @param {AncientMob} mob
   */
  addMob(mob) {
    this.ancientMobList.push(mob);
  }

  /**
   * @param {AncientMob} mob
   */
  removeMob(mob) {
    this.ancientMobList = this.ancientMobList.filter(m => m.name !== mob.name);
  }

  /**
   * @param {AncientMob} mob
   * @return {Boolean}
   */
  isMobPicked(mob) {
    return !!this.ancientMobList.filter(m => m.name === mob.name).length;
  }

  /**
   * @return {String[]}
   */
  get runeSequence() {
    const groupedRunes = this.ancientMobList
      .map(mob => mob.groupedRunes)
      .reduce((acc, val) => {
        Object.entries(val).forEach(([rune, amount]) => { acc[rune] = Math.max(acc[rune] || 0, amount); });
        return acc;
      }, {})
    ;
    return new RuneSequence(Object.entries(groupedRunes).reduce((acc, [key, val]) => acc.concat([...Array(val).keys()].map(() => key)), []));
  }

  /**
   * @param {RuneSequence} runes
   * @return {Item[]}
   */
  getBestStartingItemList(runes) {
    return $shuffleArray(Object.values({ ...MeleeItemsData, ...RangedItemsData, ...ArmorItemsData })
      .filter(data => !data.disabled && data.name !== 'MysteryArmor')
      .map($createItem.bind(this))
      .sort((a, b) => runes.countContains(b.runeSequence) - runes.countContains(a.runeSequence))
      .filter((item, i, array) => runes.countContains(item.runeSequence) >= runes.countContains(array[0].runeSequence)),
    );
  }

  /**
   * @param {RuneSequence} runes
   * @param {String[]} excludeTypes
   * @return {Item[]}
   */
  getNextItemListExcludingTypes(runes, excludeTypes = []) {
    return $shuffleArray(Object.values(ItemsData)
      .filter(data => !data.disabled && !excludeTypes.includes(data.type) && data.name !== 'MysteryArmor')
      .map($createItem.bind(this))
      .sort((a, b) => runes.countContains(b.runeSequence) - runes.countContains(a.runeSequence))
      .filter((item, i, array) => runes.countContains(item.runeSequence) >= runes.countContains(array[0].runeSequence)),
    );
  }

  /**
   * @return {Item[]}
   */
  findOffers() {
    const orderResult = (list) => {
      const [meleeItem] = list.filter(item => item && item.itemType === ItemTypeEnum.MELEE);
      const [rangedItem] = list.filter(item => item && item.itemType === ItemTypeEnum.RANGED);
      const [armorItem] = list.filter(item => item && item.itemType === ItemTypeEnum.ARMOR);
      const [artefactItem] = list.filter(item => item && item.itemType === ItemTypeEnum.ARTEFACT);
      return [meleeItem, rangedItem, armorItem, artefactItem];
    };
    const runes = this.runeSequence;

    if (runes.isEmpty() || runes.length > 11) {
      return [null, null, null, null];
    }

    const validStartingItems = this.getBestStartingItemList(runes);
    let firstItem = validStartingItems.shift();
    let secondItem = null;
    let thirdItem = null;
    let fourthItem = null;

    while (firstItem) {
      const firstItemRunes = runes.sub(firstItem.runeSequence);

      if (firstItemRunes.isEmpty()) {
        return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
      }

      const validSecondItemList = this.getNextItemListExcludingTypes(firstItemRunes, [firstItem.itemType]);
      secondItem = validSecondItemList.shift();
      while (secondItem) {
        const secondItemRunes = firstItemRunes.sub(secondItem.runeSequence);

        if (secondItemRunes.isEmpty()) {
          return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
        }

        const validThirdItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType]);
        thirdItem = validThirdItemList.shift();
        while (thirdItem) {
          const thirdItemRunes = secondItemRunes.sub(thirdItem.runeSequence);

          if (thirdItemRunes.isEmpty()) {
            return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
          }

          const validFourthItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType, thirdItem.itemType]);
          fourthItem = validFourthItemList.shift();
          while (fourthItem) {
            const fourthItemRunes = thirdItemRunes.sub(fourthItem.runeSequence);

            if (fourthItemRunes.isEmpty()) {
              return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
            }

            fourthItem = validFourthItemList.shift() || null;
          }

          thirdItem = validThirdItemList.shift() || null;
        }

        secondItem = validSecondItemList.shift() || null;
      }

      firstItem = validStartingItems.shift() || null;
    }

    return [null, null, null, null];
  }
}

export default new AncientHuntsStore();

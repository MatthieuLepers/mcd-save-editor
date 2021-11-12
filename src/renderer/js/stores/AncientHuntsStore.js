import Item from '../classes/Item';
import RuneList from '../classes/RuneList';
import { Armors, Enchants, MeleeWeapons, RangedWeapons, Items } from '../data/Content';
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
  const [enchant] = $shuffleArray(Object.values(Enchants)
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
    if (itemData.name === 'MysteryArmor') {
      itemObj.armorproperties = $shuffleArray(itemData.armorproperties.map(prop => ({ id: prop, rarity: 'Common' }))).slice(0, 2);
    } else {
      itemObj.armorproperties = itemData.armorproperties.map(prop => ({ id: prop, rarity: 'Common' }));
    }
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
   * @return {RuneList}
   */
  get runeList() {
    return this.ancientMobList
      .reduce((acc, mob) => acc.merge(mob.runeList), new RuneList())
    ;
  }

  /**
   * @param {RuneList} runes
   * @return {Item[]}
   */
  getBestStartingItemList(runes) {
    return $shuffleArray(Object.values({ ...MeleeWeapons, ...RangedWeapons, ...Armors })
      .filter(data => !data.disabled)
      .map($createItem.bind(this))
      .sort((a, b) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
      .filter((item, i, array) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)),
    );
  }

  /**
   * @param {RuneList} runes
   * @param {String[]} excludeTypes
   * @return {Item[]}
   */
  getNextItemListExcludingTypes(runes, excludeTypes = []) {
    return $shuffleArray(Object.values(Items)
      .filter(data => !data.disabled && !excludeTypes.includes(data.type))
      .map($createItem.bind(this))
      .sort((a, b) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
      .filter((item, i, array) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)),
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
    const runes = this.runeList;

    if (runes.isEmpty() || runes.length > 11) {
      return [null, null, null, null];
    }

    const validStartingItems = this.getBestStartingItemList(runes);
    let firstItem = validStartingItems.shift();
    let secondItem = null;
    let thirdItem = null;
    let fourthItem = null;

    while (firstItem) {
      const firstItemRunes = runes.sub(firstItem.runeList);

      if (firstItemRunes.isEmpty()) {
        return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
      }

      const validSecondItemList = this.getNextItemListExcludingTypes(firstItemRunes, [firstItem.itemType]);
      secondItem = validSecondItemList.shift();
      while (secondItem) {
        const secondItemRunes = firstItemRunes.sub(secondItem.runeList);

        if (secondItemRunes.isEmpty()) {
          return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
        }

        const validThirdItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType]);
        thirdItem = validThirdItemList.shift();
        while (thirdItem) {
          const thirdItemRunes = secondItemRunes.sub(thirdItem.runeList);

          if (thirdItemRunes.isEmpty()) {
            return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
          }

          const validFourthItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType, thirdItem.itemType]);
          fourthItem = validFourthItemList.shift();
          while (fourthItem) {
            const fourthItemRunes = thirdItemRunes.sub(fourthItem.runeList);

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

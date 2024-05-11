import { computed, reactive } from 'vue';

import Item, { type IItem, type IItemData } from '@renderer/core/classes/Item';
import type { IEnchantmentData } from '@renderer/core/classes/Enchantment';
import RuneList from '@renderer/core/classes/RuneList';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import type AncientMob from '@renderer/core/classes/AncientMob';
import { shuffleArray } from '@renderer/core/utils';
import {
  Armors,
  Enchants,
  MeleeWeapons,
  RangedWeapons,
  Items,
} from '@renderer/core/data/Content';

function $createRandomEnchantmentByType(type: string) {
  const [enchant] = shuffleArray(Object.values(Enchants as Record<string, IEnchantmentData>)
    .filter((data: IEnchantmentData) => !data.disabled && data.type.includes(type)));
  return {
    id: enchant.name,
    investedPoints: 0,
    level: 0,
  };
}

function $createItem(itemData: IItemData, index: number): Item {
  const itemObj: IItem = {
    inventoryIndex: index,
    power: 1,
    rarity: itemData.rarity[0],
    type: itemData.name,
    upgraded: false,
  };
  if (itemData.type !== 'Artefact') {
    itemObj.enchantments = [...Array(9).keys()].map(() => $createRandomEnchantmentByType(itemData.type));
  }
  if (itemData.type === 'Armor') {
    if (itemData.name === 'MysteryArmor') {
      itemObj.armorproperties = shuffleArray(itemData.armorproperties.map((prop) => ({ id: prop, rarity: 'Common' }))).slice(0, 2);
    } else {
      itemObj.armorproperties = itemData.armorproperties.map((prop) => ({ id: prop, rarity: 'Common' }));
    }
  }
  return new Item(itemObj);
}

const useAncientHuntsStore = () => {
  const state = reactive({
    ancientMobList: [] as Array<AncientMob>,
  });

  const runeList = computed(() => state.ancientMobList
    .reduce((acc, mob) => acc.merge(mob.runeList), new RuneList([])));

  const actions = {
    addMob(mob: AncientMob) {
      state.ancientMobList.push(mob);
    },
    removeMob(mob: AncientMob) {
      state.ancientMobList = state.ancientMobList.filter((m) => m.name !== mob.name);
    },
    isMobPicked(mob: AncientMob): boolean {
      return !!state.ancientMobList.filter((m) => m.name === mob.name).length;
    },
    getBestStartingItemList(runes: RuneList): Array<Item> {
      return shuffleArray(Object.values({ ...MeleeWeapons, ...RangedWeapons, ...Armors } as Record<string, IItemData>)
        .filter((data) => !data.disabled)
        .map($createItem.bind(this))
        .sort((a, b) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
        .filter((item, _i, array) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)));
    },
    getNextItemListExcludingTypes(runes: RuneList, excludeTypes: Array<string>): Array<Item> {
      return shuffleArray(Object.values(Items as Record<string, IItemData>)
        .filter((data) => !data.disabled && !(excludeTypes ?? []).includes(data.type))
        .map($createItem.bind(this))
        .sort((a, b) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
        .filter((item, _i, array) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)));
    },
    findOffers() {
      const orderResult = (list: Array<Item | null>) => {
        const [meleeItem] = list.filter((item) => item && item.itemType === ItemTypeEnum.MELEE);
        const [rangedItem] = list.filter((item) => item && item.itemType === ItemTypeEnum.RANGED);
        const [armorItem] = list.filter((item) => item && item.itemType === ItemTypeEnum.ARMOR);
        const [artefactItem] = list.filter((item) => item && item.itemType === ItemTypeEnum.ARTEFACT);
        return [meleeItem, rangedItem, armorItem, artefactItem];
      };
      const runes = runeList.value;

      if (runes.isEmpty() || runes.length > 11) {
        return [null, null, null, null];
      }

      const validStartingItems = this.getBestStartingItemList(runes);
      let firstItem: Item | null = validStartingItems.shift() ?? null;
      let secondItem: Item | null = null;
      let thirdItem: Item | null = null;
      let fourthItem: Item | null = null;

      while (firstItem) {
        const firstItemRunes = runes.sub(firstItem.runeList);

        if (firstItemRunes.isEmpty()) {
          return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
        }

        const validSecondItemList = this.getNextItemListExcludingTypes(firstItemRunes, [firstItem.itemType]);
        secondItem = validSecondItemList.shift() ?? null;
        while (secondItem) {
          const secondItemRunes = firstItemRunes.sub(secondItem.runeList);

          if (secondItemRunes.isEmpty()) {
            return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
          }

          const validThirdItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType]);
          thirdItem = validThirdItemList.shift() ?? null;
          while (thirdItem) {
            const thirdItemRunes = secondItemRunes.sub(thirdItem.runeList);

            if (thirdItemRunes.isEmpty()) {
              return orderResult([firstItem, secondItem, thirdItem, fourthItem]);
            }

            const validFourthItemList = this.getNextItemListExcludingTypes(secondItemRunes, [firstItem.itemType, secondItem.itemType, thirdItem.itemType]);
            fourthItem = validFourthItemList.shift() ?? null;
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
    },
  };

  return {
    state,
    runeList,
    actions,
  };
};

export const ancientHuntsStore = useAncientHuntsStore();

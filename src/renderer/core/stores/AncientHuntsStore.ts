import { computed, reactive } from 'vue';

import Item from '@renderer/core/classes/Item';
import RuneList from '@renderer/core/classes/RuneList';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import type AncientMob from '@renderer/core/entities/ancientMob';
import { shuffleArray } from '@renderer/core/utils';
import { itemsStore } from '../entities/item/store';

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
      state.ancientMobList = state.ancientMobList.filter((m) => m.id !== mob.id);
    },
    isMobPicked(mob: AncientMob): boolean {
      return !!state.ancientMobList.filter((m) => m.id === mob.id).length;
    },
    getBestStartingItemList(runes: RuneList): Array<Item> {
      return shuffleArray(Object
        .values(itemsStore.itemsButArtefacts.value)
        .map((itemData, i) => itemData.toGameData(i))
        .sort((a: Item, b: Item) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
        .filter((item: Item, _i, array: Array<Item>) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)));
    },
    getNextItemListExcludingTypes(runes: RuneList, excludeTypes: Array<string>): Array<Item> {
      return shuffleArray(Object
        .values(itemsStore.items.value)
        .filter((data) => !(excludeTypes ?? []).includes(data.type))
        .map((itemData, i) => itemData.toGameData(i))
        .sort((a: Item, b: Item) => runes.countContains(b.runeList) - runes.countContains(a.runeList))
        .filter((item: Item, _i, array: Array<Item>) => runes.countContains(item.runeList) >= runes.countContains(array[0].runeList)));
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

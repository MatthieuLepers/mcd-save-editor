import { reactive } from 'vue';
import type { RouteLocation } from 'vue-router';

import Profil from '@renderer/core/classes/Profil';
import type Character from '@renderer/core/classes/Character';
import type Item from '@renderer/core/classes/Item';
import type Enchantment from '@renderer/core/classes/Enchantment';

interface StoreData {
  profilList: Array<Profil>;
  selectedProfil: Profil | null;
  selectedCharacter: Character | null;
  oldSelectedItem: Item | null;
  selectedItem: Item | null;
  selectedEnchant: Enchantment | null;
  selectedEnchantChunkIndex: number | null;
  key: number;
}

const useGlobalStore = () => {
  const state = reactive<StoreData>({
    profilList: Profil.getListFromSaveDirectory(),
    selectedProfil: null,
    selectedCharacter: null,
    oldSelectedItem: null,
    selectedItem: null,
    selectedEnchant: null,
    selectedEnchantChunkIndex: null,
    key: 0,
  });

  const actions = {
    enableTutorialOnRoute(route: RouteLocation) {
      return route.name === 'Home';
    },
    getUnallowedEnchantForChunk() {
      if (!state.selectedEnchant) {
        return [];
      }
      if (state.selectedEnchant.netherite) {
        return state.selectedItem!.chunkedEnchantments
          .reduce((acc, chunk) => [...acc, chunk.find((ench) => ench.level > 0)!], [])
          .filter((ench) => !!ench && ench.id !== 'Unset')
          .map((ench) => ench.id)
        ;
      }
      const enchantIndex = state.selectedItem!.chunkedEnchantments[state.selectedEnchantChunkIndex!]
        .findIndex((ench) => JSON.stringify(ench.data) === JSON.stringify(state.selectedEnchant!.data))
      ;
      return state.selectedItem!.chunkedEnchantments[state.selectedEnchantChunkIndex!]
        .filter((_ench, i) => i !== enchantIndex)
        .map((ench) => ench.id)
        .filter((enchId) => enchId !== 'Unset')
      ;
    },
  };

  const setters = {
    setProfil(profil: Profil) {
      state.selectedProfil = profil;
      [state.selectedCharacter] = profil.characters;
      state.oldSelectedItem = null;
      [state.selectedItem] = state.selectedCharacter.inventory.inventory;
      state.selectedEnchant = null;
      state.selectedEnchantChunkIndex = null;
    },
    setCharacter(character: Character) {
      state.selectedCharacter = character;
      state.oldSelectedItem = null;
      [state.selectedItem] = character.inventory.inventory;
      state.selectedEnchant = null;
      state.selectedEnchantChunkIndex = null;
    },
    setItem(item: Item) {
      state.oldSelectedItem = state.selectedItem;
      state.selectedItem = item;
      state.selectedEnchant = null;
      state.selectedEnchantChunkIndex = null;
    },
    setEnchant(enchant: Enchantment) {
      if (state.selectedEnchant?.netherite) {
        if (state.selectedEnchant!.id !== 'Unset' && state.selectedEnchant!.level > 0) {
          state.selectedItem!.netheriteEnchant = state.selectedEnchant!;
        } else {
          delete state.selectedItem!.data.netheriteEnchant;
        }
        state.selectedItem!.$key += 1;
      }
      state.selectedEnchant = enchant;
      state.selectedEnchantChunkIndex = null;
    },
  };

  return {
    state,
    actions,
    setters,
  };
};

export const globalStore = useGlobalStore();

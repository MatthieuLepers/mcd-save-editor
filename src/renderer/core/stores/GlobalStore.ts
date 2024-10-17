import { reactive } from 'vue';
import type { RouteLocation } from 'vue-router';

import Profil from '@renderer/core/classes/Profil';
import Character from '@renderer/core/classes/Character';
import type GameItem from '@renderer/core/entities/item/game';
import type GameEnchant from '@renderer/core/entities/enchant/game';
import DemoCharacter from '../../public/json/demo.json';

interface StoreData {
  profilList: Array<Profil>;
  selectedProfil: Profil | null;
  selectedCharacter: Character | null;
  oldSelectedItem: GameItem | null;
  selectedItem: GameItem | null;
  selectedEnchant: GameEnchant | null;
  selectedEnchantChunkIndex: number | null;
  key: number;
  isDemo: boolean;
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
    isDemo: false,
  });

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
    setItem(item: GameItem) {
      state.oldSelectedItem = state.selectedItem;
      state.selectedItem = item;
      state.selectedEnchant = null;
      state.selectedEnchantChunkIndex = null;
    },
    setEnchant(enchant: GameEnchant) {
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
    loadDemoCharacter() {
      const demo = new Character(DemoCharacter, 'demo.json');
      const profil = new Profil('0');
      state.isDemo = true;
      state.profilList = [profil];
      profil.characters = [demo];
      setters.setProfil(profil);
    },
  };

  return {
    state,
    actions,
    setters,
  };
};

export const globalStore = useGlobalStore();

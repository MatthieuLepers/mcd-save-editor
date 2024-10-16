import { reactive, computed } from 'vue';
import Armor from '@renderer/core/entities/armor';
import Artefact from '@renderer/core/entities/artefact';
import Weapon from '@renderer/core/entities/weapon';

interface IState {
  armors: Record<string, Armor>;
  artefacts: Record<string, Artefact>;
  weapons: Record<string, Weapon>;
}

const useItemsStore = () => {
  const state = reactive<IState>({
    armors: {},
    artefacts: {},
    weapons: {},
  });

  const items = computed(() => ({
    ...state.armors,
    ...state.artefacts,
    ...state.weapons,
  }));

  const itemsButArtefacts = computed(() => ({
    ...state.armors,
    ...state.weapons,
  }));

  const actions = {
    async load() {
      const armorList = await api.Armor.findAll();
      state.armors = armorList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new Armor(obj),
      }), {});

      const artefactList = await api.Artefact.findAll();
      state.artefacts = artefactList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new Artefact(obj),
      }), {});

      const weaponList = await api.Weapon.findAll();
      state.weapons = weaponList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new Weapon(obj),
      }), {});
    },
  };

  return {
    state,
    items,
    itemsButArtefacts,
    actions,
  };
};

export const itemsStore = useItemsStore();

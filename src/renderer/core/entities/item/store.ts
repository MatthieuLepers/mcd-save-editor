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
        [obj.dataValues.id]: new Armor(obj.dataValues),
      }), {});

      const artefactList = await api.Artefact.findAll();
      state.artefacts = artefactList.reduce((acc, obj) => ({
        ...acc,
        [obj.dataValues.id]: new Artefact(obj.dataValues),
      }), {});

      const weaponList = await api.Weapon.findAll();
      state.weapons = weaponList.reduce((acc, obj) => ({
        ...acc,
        [obj.dataValues.id]: new Weapon(obj.dataValues),
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

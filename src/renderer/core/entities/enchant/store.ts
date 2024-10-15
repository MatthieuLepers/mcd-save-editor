import { reactive } from 'vue';
import Enchant from '@renderer/core/entities/enchant';

interface IState {
  enchants: Record<string, Enchant>;
}

const useEnchantsStore = () => {
  const state = reactive<IState>({
    enchants: {},
  });

  const actions = {
    async load() {
      const objList = await api.Enchant.findAll();
      state.enchants = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new Enchant(obj),
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const enchantsStore = useEnchantsStore();

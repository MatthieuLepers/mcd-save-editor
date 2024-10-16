import { reactive } from 'vue';

import Enchant from '@renderer/core/entities/enchant';
import GameEnchant from '@renderer/core/entities/enchant/game';
import type { Type } from '@renderer/core/entities/enchant/enums';
import { shuffleArray } from '@renderer/core/utils';

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
        [obj.dataValues.id]: new Enchant(obj.dataValues),
      }), {});
    },
    createRandomGameEnchantOfType(type: `${Type}`): GameEnchant {
      const [enchant] = shuffleArray(Object
        .values(state.enchants)
        .filter((data) => data.type.includes(type)));
      return new GameEnchant({
        id: enchant.id,
        investedPoints: 0,
        level: 0,
      });
    },
  };

  return {
    state,
    actions,
  };
};

export const enchantsStore = useEnchantsStore();

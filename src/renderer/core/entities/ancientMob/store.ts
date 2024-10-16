import { reactive } from 'vue';
import AncientMob from '@renderer/core/entities/ancientMob';

interface IState {
  mobs: Record<string, AncientMob>;
}

const useAncientMobsStore = () => {
  const state = reactive<IState>({
    mobs: {},
  });

  const actions = {
    async load() {
      const objList = await api.AncientMob.findAll();
      state.mobs = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.dataValues.id]: new AncientMob(obj.dataValues),
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const ancientMobsStore = useAncientMobsStore();

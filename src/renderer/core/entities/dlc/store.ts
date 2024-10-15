import { reactive } from 'vue';
import Dlc from '@renderer/core/entities/dlc';

interface IState {
  dlcs: Record<string, Dlc>;
}

const useDlcsStore = () => {
  const state = reactive<IState>({
    dlcs: {},
  });

  const actions = {
    async load() {
      const objList = await api.Dlc.findAll();
      state.dlcs = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new Dlc({
          ...obj,
          releasedAt: new Date(obj.releasedAt),
        }),
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const dlcsStore = useDlcsStore();

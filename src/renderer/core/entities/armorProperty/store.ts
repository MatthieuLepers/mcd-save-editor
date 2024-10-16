import { reactive } from 'vue';
import ArmorProperty from '@renderer/core/entities/armorProperty';

interface IState {
  properties: Record<string, ArmorProperty>;
}

const useArmorPropertiesStore = () => {
  const state = reactive<IState>({
    properties: {},
  });

  const actions = {
    async load() {
      const objList = await api.ArmorProperty.findAll();
      state.properties = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: new ArmorProperty(obj),
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const armorPropertiesStore = useArmorPropertiesStore();

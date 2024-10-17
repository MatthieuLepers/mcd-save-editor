import { reactive } from 'vue';
import Event from '@renderer/core/entities/event';

interface IState {
  events: Record<string, Event>;
}

const useEventsStore = () => {
  const state = reactive<IState>({
    events: {},
  });

  const actions = {
    async load() {
      const objList = await api.Event.findAll();
      state.events = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.dataValues.id]: new Event({
          ...obj.dataValues,
          startedAt: new Date(obj.dataValues.startedAt),
          endedAt: new Date(obj.dataValues.endedAt),
        }),
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const eventsStore = useEventsStore();

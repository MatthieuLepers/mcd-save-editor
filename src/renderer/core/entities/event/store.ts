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
        [obj.id]: new Event({
          ...obj,
          startedAt: new Date(obj.startedAt),
          endedAt: new Date(obj.endedAt),
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

import { reactive, nextTick } from 'vue';

export interface IModal {
  name: string;
  state: {
    open: boolean;
  };
}

export interface ModalState {
  modals: Record<string, IModal>;
  openQueue: Array<string>;
}

const useModalStore = () => {
  const state = reactive<ModalState>({
    modals: {},
    openQueue: [],
  });

  const actions = {
    register(modal: IModal) {
      state.modals[modal.name] = modal;
    },
    unregister(modal: IModal) {
      if (state.modals[modal.name]) {
        delete state.modals[modal.name];
      }
    },
    show(modalName: string): IModal | null {
      if (state.modals[modalName]) {
        state.openQueue.unshift(modalName);
        nextTick(() => {
          state.modals[modalName].state.open = true;
        });
        return state.modals[modalName];
      }
      return null;
    },
    hide(modalName: string) {
      nextTick(() => {
        if (state.modals[modalName] && actions.isLastOpen(modalName)) {
          state.openQueue.shift();
          state.modals[modalName].state.open = false;
        }
      });
    },
    isLastOpen(modalName: string): boolean {
      const [name] = state.openQueue;
      return modalName === name;
    },
  };

  return {
    state,
    actions,
  };
};

export const modalStore = useModalStore();

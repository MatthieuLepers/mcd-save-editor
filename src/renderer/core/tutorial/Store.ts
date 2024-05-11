import { reactive, nextTick } from 'vue';
import type { Polygon } from '@renderer/core/tutorial/PolygonEnum';
import TutorialStepList from '@renderer/core/tutorial/StepList';

const useTutorialStore = () => {
  const state = reactive({
    currentStep: 'Welcome',
    isDisabled: false,
    stepData: TutorialStepList.Welcome,
    show: false,
  });

  const actions = {
    setFullfilled(objective: string, val: boolean, reasonId: string | null, force = false) {
      nextTick(() => {
        if (state.stepData.objectiveList[objective]) {
          state.stepData.objectiveList[objective].setFullfilled(val, reasonId ?? null, force);
        }
      });
    },
    refreshPolygonListForObjective(objective: string, polygonList?: Array<Polygon>) {
      nextTick(() => {
        if (state.stepData.objectiveList[objective]) {
          state.stepData.objectiveList[objective].polygonList = polygonList ?? [];
        }
      });
    },
    disableTutorial() {
      state.isDisabled = true;
      state.currentStep = 'TutorialDisabled';
      state.stepData = TutorialStepList.TutorialDisabled;
    },
    enableTutorial() {
      state.isDisabled = false;
      state.currentStep = 'Welcome';
      state.stepData = TutorialStepList.Welcome;
    },
  };

  return {
    state,
    actions,
  };
};

export const tutorialStore = useTutorialStore();

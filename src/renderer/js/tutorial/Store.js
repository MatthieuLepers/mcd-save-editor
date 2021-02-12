import Vue from 'vue';
import TutorialStepList from '@/js/tutorial/StepList';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class TutorialStore {
  /**
   * @constructor
   */
  constructor() {
    this.currentStep = 'Welcome';
    this.stepData = TutorialStepList.Welcome;
  }

  /**
   * @param {String} objective
   * @param {Boolean} val
   * @param {String} reasonId
   * @param {Boolean} force
   */
  setFullfilled(objective, val, reasonId = null, force = false) {
    Vue.nextTick(() => {
      if (this.stepData.objectiveList[objective]) {
        this.stepData.objectiveList[objective].setFullfilled(val, reasonId, force);
      }
    });
  }

  /**
   * @param {String} objective
   * @param {Array[]} polygonList
   */
  refreshPolygonListForObjective(objective, polygonList = []) {
    Vue.nextTick(() => {
      if (this.stepData.objectiveList[objective]) {
        this.stepData.objectiveList[objective].polygonList = polygonList;
      }
    });
  }

  disableTutorial() {
    this.currentStep = 'TutorialDisabled';
    this.stepData = TutorialStepList.TutorialDisabled;
  }

  enableTutorial() {
    this.currentStep = 'Welcome';
    this.stepData = TutorialStepList.Welcome;
  }
}

export default new TutorialStore();

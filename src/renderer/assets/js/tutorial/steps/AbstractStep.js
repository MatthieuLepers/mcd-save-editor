import Store from '../Store';
import StepList from '../StepList';
import Objective from '../Objective';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class AbstractStep {
  /**
   * @constructor
   * @param {Object} options
   */
  constructor(options = {}) {
    if (Object.getPrototypeOf(this).name === 'AbstractStep') {
      throw new Error('Cannot instanciate abstract class AbstractStep!');
    }
    this.nextStepId = null;
    this.prevStepId = null;
    this.objectiveList = {};

    Object.assign(this, options);
  }

  /**
   * @return {Array}
   */
  get polygonList() {
    if (this.hasObjectives()) {
      const [objective] = Object.values(this.objectiveList).filter((objective) => !objective.isFullfilled());
      return (objective || {}).polygonList || [];
    }
    return [];
  }

  /**
   * @return {Objective}
   */
  get currentObjective() {
    if (this.hasObjectives()) {
      const [objective] = Object.values(this.objectiveList).filter((objective) => !objective.isFullfilled());
      return (objective || {});
    }
    return {};
  }

  /**
   * @return {Boolean}
   */
  hasObjectives() {
    return Object.values(this.objectiveList).length;
  }

  /**
   * @param {String} objectiveName
   * @param {String} parentObjectiveName
   */
  addObjective(objectiveData) {
    this.objectiveList[objectiveData.name] = new Objective(objectiveData);
  }

  next() {
    if (this.nextStepId && this.isFinished()) {
      Store.currentStep = this.nextStepId;
      Store.stepData = StepList[this.nextStepId];
      Store.stepData.resetObjectives();
    }
  }

  prev() {
    if (this.prevStepId) {
      Store.currentStep = this.prevStepId;
      Store.stepData = StepList[this.prevStepId];
      Store.stepData.resetObjectives();
    }
  }

  /**
   * @return {Boolean}
   */
  isFinished() {
    return Object.values(this.objectiveList).reduce((acc, objective) => acc && objective.isFullfilled(), true);
  }

  resetObjectives() {
    Object.values(this.objectiveList).forEach((objective) => { objective.reset(); });
  }
}

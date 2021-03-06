import Vue from 'vue';
import TutorialStore from './Store';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Objective {
  /**
   * @constructor
   * @param {String} name
   * @param {Object} options
   */
  constructor(options = {}) {
    this.name = null;
    this.parent = null;
    this.polygonList = [];
    this.fullfilled = null;
    this.reasonId = null;
    this.onFullfilled = null;
    this.onError = null;

    Object.assign(this, options);
  }

  /**
   * @param {Boolean} val
   * @return {this}
   */
  setFullfilled(val, reasonId = null, force = false) {
    if (this.parent && !TutorialStore.stepData.objectiveList[this.parent].fullfilled) {
      return this;
    }
    if (!this.fullfilled || (this.fullfilled && this.reasonId !== null) || force) {
      this.fullfilled = val;
      this.reasonId = reasonId;
      if (this.isFullfilled() && typeof this.onFullfilled === 'function') {
        Vue.nextTick(() => {
          this.onFullfilled();
        });
      }
      if (!this.isFullfilled() && typeof this.onError === 'function') {
        Vue.nextTick(() => {
          this.onError();
        });
      }
    }
    return this;
  }

  /**
   * @return {String}
   */
  getIcon() {
    if (this.fullfilled === null) {
      return 'neutral';
    }
    return this.fullfilled ? 'check' : 'close';
  }

  /**
   * @return {Boolean}
   */
  isFullfilled() {
    return this.fullfilled && !this.reasonId;
  }

  reset() {
    this.fullfilled = null;
    this.reasonId = null;
  }
}

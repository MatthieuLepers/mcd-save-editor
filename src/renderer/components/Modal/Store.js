import Vue from 'vue';

class ModalStore {
  /**
   * @constructor
   */
  constructor() {
    this.storedObjList = {};
  }

  /**
   * @param {Modal} component
   */
  add(component) {
    this.storedObjList[component.name] = component;
  }

  /**
   * @param {Modal} component
   */
  remove(component) {
    if (this.exists(component)) {
      delete this.storedObjList[component.name];
    }
  }

  /**
   * @param {Modal} component
   */
  exists(component) {
    return !!this.storedObjList[component.name];
  }

  /**
   * @param {String} name
   * @return {Modal}
   */
  showModal(name) {
    if (this.storedObjList[name]) {
      Vue.nextTick(() => {
        this.storedObjList[name].show();
      });
      return this.storedObjList[name];
    }
    return null;
  }

  /**
   * @param {String} name
   */
  hideModal(name) {
    if (this.storedObjList[name]) {
      Vue.nextTick(() => {
        this.storedObjList[name].hide();
      });
      return this.storedObjList[name];
    }
    return null;
  }
}

export default new ModalStore();

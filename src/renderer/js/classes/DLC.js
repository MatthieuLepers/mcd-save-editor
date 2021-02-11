import DLCsData from '../data/DLCs';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class DLC {
  /**
   * @constructor
   * @param {String} id
   * @param {Boolean} enabled
   */
  constructor(id, enabled = false) {
    this.id = id;
    this.enabled = enabled;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;
  }

  /**
   * @return {Object}
   * @throws {Error} when dlc data cannot be found
   */
  get dlcData() {
    if (!DLCsData[this.id]) {
      throw new Error(`Cannot find DLC "${this.id}!"`);
    }
    return DLCsData[this.id];
  }
}

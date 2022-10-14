import RuneList from './RuneList';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class AncientMob {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = data;

    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (val) => { this.$data[key] = val; },
      });
    });
  }

  /**
   * @return {RuneList}
   */
  get runeList() {
    return new RuneList(this.neededRunes);
  }

  /**
   * @return {Object}
   */
  get groupedRunes() {
    return this.runeList.compressed;
  }
}

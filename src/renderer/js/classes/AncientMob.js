import RuneSequence from './RuneSequence';

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
   * @return {Object}
   */
  get groupedRunes() {
    return this.neededRunes.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {});
  }

  /**
   * @return {RunesSequence}
   */
  get runeSequence() {
    return new RuneSequence(this.neededRunes);
  }
}

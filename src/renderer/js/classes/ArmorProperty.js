import ArmorPropertiesData from '../data/ArmorProperties';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class ArmorPromerty {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = data;

    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (value) => { this.$data[key] = value; },
      });
    });
  }

  /**
   * @return {Object}
   */
  get armorPropertyData() {
    if (!ArmorPropertiesData[this.id]) {
      return ArmorPropertiesData.Unknown;
    }
    return ArmorPropertiesData[this.id];
  }

  /**
   * @return {String}
   */
  get armorPropertyIdentifier() {
    if (this.armorPropertyData.name !== 'Unknown') {
      return this.id;
    }
    return 'Unknown';
  }
}

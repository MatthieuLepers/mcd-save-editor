/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Currencies {
  /**
   * @constructor
   * @param {Object[]} data
   */
  constructor(data) {
    this.$data = data;

    this.$data.forEach((currency, i) => {
      Object.defineProperty(this, currency.type, {
        get: () => this.$data[i].count,
        set: (value) => { this.$data[i].count = parseInt(value, 10); },
      });
    });
  }
}

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class AbstractValidator {
  /**
   * @constructor
   * @param {any} data
   */
  constructor(data) {
    if (Object.getPrototypeOf(this).name === 'AbstractValidator') {
      throw new Error('Cannot instanciate abstract class "AbstractValidator"');
    }
    this.data = data;
    this.$keys = (typeof this.data === 'object' ? Object.keys(this.data) : []);
  }

  /**
   * @param  {...String} keys
   * @return {Boolean}
   */
  hasKeys(...keys) {
    return keys.reduce((acc, key) => {
      if (!key.startsWith('!')) {
        return acc && this.$keys.indexOf(key) >= 0;
      }
      return acc && this.$keys.indexOf(key.substr(1)) < 0;
    }, true);
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    throw new Error('You must implement the "isValid" method.');
  }
}

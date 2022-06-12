/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class AbstractValidator {
  /**
   * @constructor
   * @param {any} data
   * @param {String[]} corruptionData
   */
  constructor(data, corruptionData = []) {
    if (this.constructor.name === 'AbstractValidator') {
      throw new Error('Cannot instanciate abstract class "AbstractValidator"');
    }
    this.data = data;
    this.$corruptionData = corruptionData;
    this.$keys = (typeof this.data === 'object' && this.data ? Object.keys(this.data) : []);
  }

  /**
   * @param {String[]} requiredKeys
   * @param {String[]} possibleKeys
   * @param {String[]} incompatibleKeys
   * @return {Boolean}
   */
  keysValidator(requiredKeys, possibleKeys = [], incompatibleKeys = []) {
    const allKeys = [...requiredKeys, ...incompatibleKeys, ...possibleKeys];
    const hasMissingRequiredKeys = requiredKeys.filter((key) => !this.$keys.includes(key));
    const hasIcompatibleKeys = incompatibleKeys.length && incompatibleKeys.every((key) => this.$keys.includes(key));
    const hasUnnecessaryKeys = this.$keys.filter((key) => !allKeys.includes(key));

    if (hasMissingRequiredKeys.length) {
      this.$corruptionData.push(`[${this.identifier}] Missing required key${hasMissingRequiredKeys.length > 1 ? 's' : ''} : [${hasMissingRequiredKeys.join(', ')}]`);
    }

    if (hasIcompatibleKeys) {
      this.$corruptionData.push(`[${this.identifier}] Incompatible keys : [${incompatibleKeys.join(', ')}]`);
    }

    if (hasUnnecessaryKeys.length) {
      this.$corruptionData.push(`[${this.identifier}] Unnecessary key${hasUnnecessaryKeys.length > 1 ? 's' : ''} found : [${hasUnnecessaryKeys.join(', ')}]`);
    }
    return !this.$corruptionData.length;
  }

  /**
   * @return {String}
   */
  get identifier() {
    throw new Error(`You must implement abstract computed property 'identifier' in class '${this.constructor.name}'`);
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
      return acc && this.$keys.indexOf(key.substring(1)) < 0;
    }, true);
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    return !!this.data;
  }
}

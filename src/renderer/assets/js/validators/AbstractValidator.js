import ValidationErrorReport from './ValidationErrorReport';

export default class AbstractValidator {
  /**
   * @param {Object} data
   */
  constructor(data) {
    if (this.constructor.name === 'AbstractValidator') {
      throw new Error('Cannot instanciate abstract class AbstractValidator');
    }
    this.data = data;
    this.errors = [];
  }

  /**
   * @param {Object} param0
   */
  addErrorReport({ type, item, error }) {
    this.errors.push(new ValidationErrorReport(type, item, error));
  }

  /**
   * @return {Boolean}
   */
  isValid() {
    return !this.errors.length;
  }
}

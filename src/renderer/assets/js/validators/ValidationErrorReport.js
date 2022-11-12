export default class ValidationErrorReport {
  /**
   * @param {String} type
   * @param {Item} item
   * @param {ValidationError} error
   */
  constructor(type, item, error) {
    this.type = type;
    this.item = item;
    this.error = error;
  }

  getLine() {
    const inst = JSON.stringify(this.item, null, 2).split('\n');
    const instance = JSON.stringify(this.error.instance, null, 2).split('\n');
    console.log(this.error, inst.findIndex((line) => line.includes(instance[0])));
    return '';
  }
}

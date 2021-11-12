export default class Enum {
  /**
   * @return {Array}
   */
  static get list() {
    return Object
      .keys(Object.getOwnPropertyDescriptors(this))
      .filter((descriptor) => descriptor.toUpperCase() === descriptor)
      .map((descriptor) => this[descriptor])
    ;
  }
}

class NotificationStore {
  /**
   * @constructor
   */
  constructor() {
    this.storage = [];
    this.timers = [];
  }

  /**
   * @param {String} variant - [danger, warning, success]
   * @param {String} msg
   */
  pushNotification(variant, msg) {
    this.storage.push({ variant, msg });
  }

  /**
   * @param {Number} index
   */
  removeNotification(index) {
    this.storage.splice(index, 1);
  }

  /**
   * @param {String} msg
   */
  success(msg) {
    this.pushNotification('success', msg);
  }

  /**
   * @param {String} msg
   */
  warning(msg) {
    this.pushNotification('warning', msg);
  }

  /**
   * @param {String} msg
   */
  error(msg) {
    this.pushNotification('danger', msg);
  }
}

export default new NotificationStore();

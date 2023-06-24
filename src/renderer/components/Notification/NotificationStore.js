class NotificationStore {
  /**
   * @constructor
   */
  constructor() {
    this.storage = [];
  }

  /**
   * @param {String} variant - [danger, warning, success]
   * @param {String} msg
   * @return {Object}
   */
  pushNotification(variant, msg) {
    const notification = { variant, msg };
    this.storage.push(notification);
    return notification;
  }

  /**
   * @param {Number} index
   * @return {Object}
   */
  removeNotification(notification) {
    const [removed] = this.storage.splice(this.storage.indexOf(notification), 1);
    return removed;
  }

  /**
   * @param {String} msg
   * @return {Object}
   */
  success(msg) {
    return this.pushNotification('success', msg);
  }

  /**
   * @param {String} msg
   * @return {Object}
   */
  warning(msg) {
    return this.pushNotification('warning', msg);
  }

  /**
   * @param {String} msg
   * @return {Object}
   */
  error(msg) {
    return this.pushNotification('danger', msg);
  }
}

export default new NotificationStore();

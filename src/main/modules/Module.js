/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Module {
  /**
   * @constructor
   */
  constructor() {
    if (this.constructor.name === 'Module') {
      throw new Error('Cannot instianciate abstract class "Module"!');
    }
  }

  /**
   * @param {Object} ipcMain
   */
  register() {
    throw new Error(`[${this.constructor.name}] You must implement "register" method!`);
  }
}

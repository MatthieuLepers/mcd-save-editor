import { ipcMain } from 'electron';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class ModuleManager {
  constructor() {
    this.moduleList = [];
  }

  /**
   * @param  {Module[]} moduleList
   */
  registerModule(...moduleList) {
    moduleList.forEach((module) => {
      this.moduleList.push(module);
      module.register(ipcMain);
    });
  }
}

export default new ModuleManager();

import { ipcRenderer } from 'electron';
import Character from './Character';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class Profil {
  /**
   * @constructor
   * @param {String} id
   */
  constructor(id) {
    this.id = id;
    this.characters = [];
  }

  /**
   * @return {this}
   */
  async fetchCharacters() {
    const characterFiles = ipcRenderer.sendSync('fetch-characters-files', this.id);
    this.characters = await Promise.all(characterFiles.map(file => Character.loadFromFile(`${this.id}/Characters/${file}`)));
    return this;
  }

  static getListFromSaveDirectory() {
    return ipcRenderer
      .sendSync('fetch-profil-folders')
      .map(id => new Profil(id))
    ;
  }
}

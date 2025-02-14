import Character from '@renderer/core/classes/Character';
import { api } from '@renderer/core/api';

export default class Profil {
  public characters: Array<Character> = [];

  constructor(public id: string) {
  }

  async fetchCharacters() {
    const characterFiles = api.sendSync('fetchCharactersFiles', this.id);
    this.characters = await Promise.all(characterFiles.map((file: string) => Character.loadFromFile(`${this.id}/Characters/${file}`)));
    return this;
  }

  static getListFromSaveDirectory(): Array<Profil> {
    return api
      .sendSync('fetchProfilFolders')
      .map((id: string) => new Profil(id))
    ;
  }
}

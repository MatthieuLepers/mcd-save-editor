import Profil from '../classes/Profil';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class GlobalStore {
  /**
   * @constructor
   */
  constructor() {
    this.profilList = Profil.getListFromSaveDirectory();
    this.$selectedProfil = null;
    this.$selectedCharacter = null;
    this.$oldSelectedItem = null;
    this.$selectedItem = null;
    this.$selectedEnchant = null;
    this.selectedEnchantChunkIndex = null;
    this.key = 0;
  }

  /**
   * @return {Profil}
   */
  get selectedProfil() {
    return this.$selectedProfil || {};
  }

  /**
   * @param {Profil} profil
   */
  set selectedProfil(profil) {
    this.$selectedProfil = profil;
    [this.$selectedCharacter] = this.$selectedProfil.characters;
    this.$oldSelectedItem = null;
    [this.$selectedItem] = this.$selectedCharacter.inventory.inventory;
    this.$selectedEnchant = null;
    this.selectedEnchantChunkIndex = null;
  }

  /**
   * @return {Character}
   */
  get selectedCharacter() {
    return this.$selectedCharacter || {};
  }

  /**
   * @param {Character} character
   */
  set selectedCharacter(character) {
    this.$selectedCharacter = character;
    this.$oldSelectedItem = null;
    [this.$selectedItem] = this.$selectedCharacter.inventory.inventory;
    this.$selectedEnchant = null;
    this.selectedEnchantChunkIndex = null;
  }

  /**
   * @return {Item}
   */
  get selectedItem() {
    return this.$selectedItem || null;
  }

  /**
   * @param {Item} item
   */
  set selectedItem(item) {
    this.$oldSelectedItem = this.$selectedItem;
    this.$selectedItem = item;
    this.$selectedEnchant = null;
    this.selectedEnchantChunkIndex = null;
  }

  /**
   * @return {Enchantment}
   */
  get selectedEnchant() {
    return this.$selectedEnchant || {};
  }

  /**
   * @param {Enchantment} enchant
   */
  set selectedEnchant(enchant) {
    if (this.selectedEnchant.$netherite) {
      if (this.selectedEnchant.id !== 'Unset' && this.selectedEnchant.level > 0) {
        this.selectedItem.netheriteEnchant = this.selectedEnchant;
      } else {
        delete this.selectedItem.$data.netheriteEnchant;
      }
      this.selectedItem.$key += 1;
    }
    this.$selectedEnchant = enchant;
    this.selectedEnchantChunkIndex = null;
  }

  /**
   * @param {Object} route
   * @return {Boolean}
   */
  enableTutorialOnRoute(route) {
    return route.name === 'Home';
  }

  /**
   * @return {String[]}
   */
  getUnallowedEnchantForChunk() {
    if (!this.selectedEnchant) {
      return [];
    }
    if (this.selectedEnchant.$netherite) {
      return this.selectedItem.chunkedEnchantments
        .reduce((acc, chunk) => [...acc, chunk.find((ench) => ench.level > 0)], [])
        .filter((ench) => !!ench && ench.id !== 'Unset')
        .map((ench) => ench.id)
      ;
    }
    const enchantIndex = this.selectedItem.chunkedEnchantments[this.selectedEnchantChunkIndex]
      .findIndex((ench) => JSON.stringify(ench.$data) === JSON.stringify(this.selectedEnchant.$data))
    ;
    return this.selectedItem.chunkedEnchantments[this.selectedEnchantChunkIndex]
      .filter((ench, i) => i !== enchantIndex)
      .map((ench) => ench.id)
      .filter((enchId) => enchId !== 'Unset')
    ;
  }
}

export default new GlobalStore();

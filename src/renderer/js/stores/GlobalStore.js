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
  }

  /**
   * @return {Item}
   */
  get selectedItem() {
    return this.$selectedItem || {};
  }

  /**
   * @param {Item} item
   */
  set selectedItem(item) {
    this.$oldSelectedItem = this.$selectedItem;
    this.$selectedItem = item;
    this.$selectedEnchant = null;
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
    if (this.selectedEnchant.$isNetherite) {
      if (this.selectedEnchant.id !== 'Unset' && this.selectedEnchant.level > 0) {
        this.selectedItem.netheriteEnchant = this.selectedEnchant;
      } else {
        delete this.selectedItem.$data.netheriteEnchant;
      }
      this.selectedItem.$key += 1;
    }
    this.$selectedEnchant = enchant;
  }
}

export default new GlobalStore();

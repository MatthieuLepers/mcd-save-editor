import AbstractItemStorage from './AbstractItemStorage';
import GlobalStore from '../stores/GlobalStore';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class StorageChest extends AbstractItemStorage {
  /**
   * @constructor
   * @param {Object[]} data
   */
  constructor(data) {
    super(300, data);
  }

  checkIntegrity() {
    this.items = this.items.filter((item) => !!item);
    this.$data = this.items.map(({ $data }) => $data);
    GlobalStore.selectedCharacter.$data.storageChestItems = this.$data;
  }
}

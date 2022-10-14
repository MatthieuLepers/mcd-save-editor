import GlobalStore from './GlobalStore';
import Filters from '../constants/Filters';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class FilteredInventoryStore {
  /**
   * @constructor
   */
  constructor() {
    this.filter = Filters.ALL;
  }

  /**
   * @return {Item[]}
   */
  get inventory() {
    return GlobalStore.selectedCharacter.inventory.inventory.filter(this.filter.filterByItem);
  }
}

export default new FilteredInventoryStore();

import PolygonEnum from '../PolygonEnum';
import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class EditItemTypeStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({
      prevStepId: 'EquipUnequip',
      nextStepId: 'EditEnchantment',
    });
    this.addObjective({
      name: 'SelectItem',
      polygonList: [
        PolygonEnum.INVENTORY_SLOT(1),
      ],
      onFullfilled: () => { this.objectiveList.OpenSelector.polygonList = [PolygonEnum.ITEM_SELECTOR()]; },
    });
    this.addObjective({
      name: 'OpenSelector',
      onFullfilled: () => { this.objectiveList.ChooseNewItem.polygonList = [PolygonEnum.ITEM_SELECTOR_DROPDOWN()]; },
    });
    this.addObjective({
      name: 'ChooseNewItem',
      onFullfilled: () => { this.objectiveList.ChangeRarity.polygonList = [PolygonEnum.ITEM_RARITY_LABEL()]; },
    });
    this.addObjective({
      name: 'ChangeRarity',
      onFullfilled: () => { this.objectiveList.ChangeLevel.polygonList = [PolygonEnum.ITEM_POWER_LABEL()]; },
    });
    this.addObjective({ name: 'ChangeLevel' });
  }
}

export default new EditItemTypeStep();

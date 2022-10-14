import PolygonEnum from '../PolygonEnum';
import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class EquipUnequipStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({
      prevStepId: 'DragAndDrop',
      nextStepId: 'EditItemType',
    });
    this.addObjective({
      name: 'UnequipItem',
      polygonList: [PolygonEnum.GEAR_MELEE],
    });
    this.addObjective({
      name: 'EquipItem',
      parent: 'UnequipItem',
      polygonList: [PolygonEnum.INVENTORY_SLOT(1)],
    });
  }
}

export default new EquipUnequipStep();

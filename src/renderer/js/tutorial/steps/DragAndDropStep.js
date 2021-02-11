import PolygonEnum from '../PolygonEnum';
import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class DragAndDropStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({
      prevStepId: 'Welcome',
      nextStepId: 'EquipUnequip',
    });
    this.addObjective({
      name: 'DragNDrop',
      polygonList: [
        PolygonEnum.INVENTORY_SLOT(1),
        PolygonEnum.INVENTORY_SLOT(2),
      ],
    });
  }
}

export default new DragAndDropStep();

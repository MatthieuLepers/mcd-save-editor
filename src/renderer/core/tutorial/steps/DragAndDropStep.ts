import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class DragAndDropStep extends AbstractStep {
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

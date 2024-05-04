import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class EquipUnequipStep extends AbstractStep {
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

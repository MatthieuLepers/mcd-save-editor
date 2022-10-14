import PolygonEnum from '../PolygonEnum';
import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class RemoveNetheriteEnchantmentStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({
      prevStepId: 'AddNetheriteEnchantmentStep',
      nextStepId: 'TutorialFinish',
    });
    this.addObjective({
      name: 'SelectItem',
      polygonList: [
        PolygonEnum.INVENTORY_SLOT(1),
      ],
      onFullfilled: () => { this.objectiveList.ClickNetheriteEnchantmentSlot.polygonList = [PolygonEnum.NETHERITE_ENCHANTMENT_SLOT()]; },
    });
    this.addObjective({
      name: 'ClickNetheriteEnchantmentSlot',
      onFullfilled: () => { this.objectiveList.OpenSelector.polygonList = [PolygonEnum.ENCHANTMENT_SELECTOR()]; },
    });
    this.addObjective({
      name: 'OpenSelector',
      onFullfilled: () => { this.objectiveList.ChooseUnsetEnchantment.polygonList = [PolygonEnum.ENCHANTMENT_SELECTOR_DROPDOWN()]; },
    });
    this.addObjective({
      name: 'ChooseUnsetEnchantment',
      onFullfilled: () => { this.objectiveList.CloseEditor.polygonList = [PolygonEnum.ENCHANTMENT_EDITOR_CLOSE_BUTTON()]; },
    });
    this.addObjective({
      name: 'CloseEditor',
    });
  }
}

export default new RemoveNetheriteEnchantmentStep();

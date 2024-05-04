import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class EditEnchantmentStep extends AbstractStep {
  constructor() {
    super({
      prevStepId: 'EditItemType',
      nextStepId: 'EditEnchantment2',
    });
    this.addObjective({
      name: 'ChooseEnchantmentToEdit',
      polygonList: [
        PolygonEnum.ENCHANTMENT_SLOT1,
      ],
      onFullfilled: () => { this.objectiveList.OpenSelector.polygonList = [PolygonEnum.ENCHANTMENT_SELECTOR()]; },
    });
    this.addObjective({
      name: 'OpenSelector',
      onFullfilled: () => { this.objectiveList.ChooseNewEnchantment.polygonList = [PolygonEnum.ENCHANTMENT_SELECTOR_DROPDOWN()]; },
    });
    this.addObjective({
      name: 'ChooseNewEnchantment',
      onFullfilled: () => { this.objectiveList.UpgradeEnchantment.polygonList = [PolygonEnum.ENCHANTMENT_TIER_LIST()]; },
    });
    this.addObjective({
      name: 'UpgradeEnchantment',
      onFullfilled: () => { this.objectiveList.CloseEditor.polygonList = [PolygonEnum.ENCHANTMENT_EDITOR_CLOSE_BUTTON()]; },
    });
    this.addObjective({
      name: 'CloseEditor',
    });
  }
}

export default new EditEnchantmentStep();

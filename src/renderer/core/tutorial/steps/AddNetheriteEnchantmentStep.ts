import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class AddNetheriteEnchantmentStep extends AbstractStep {
  constructor() {
    super({
      prevStepId: 'EditEnchantment2',
      nextStepId: 'RemoveNetheriteEnchantment',
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

export default new AddNetheriteEnchantmentStep();

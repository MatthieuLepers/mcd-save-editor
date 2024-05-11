import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class EditEnchantment2Step extends AbstractStep {
  constructor() {
    super({
      prevStepId: 'EditEnchantment',
      nextStepId: 'AddNetheriteEnchantment',
    });
    this.addObjective({
      name: 'ClickUpgradedEnchantment',
      polygonList: [
        PolygonEnum.SELECTED_ENCHANTMENT,
      ],
      onFullfilled: () => { this.objectiveList.DowngradeEnchantment.polygonList = [PolygonEnum.ENCHANTMENT_TIER_LIST()]; },
    });
    this.addObjective({
      name: 'DowngradeEnchantment',
    });
    this.addObjective({
      name: 'ChooseEnchantmentToEdit',
      polygonList: [
        PolygonEnum.ENCHANTMENT_SLOT2,
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

export default new EditEnchantment2Step();

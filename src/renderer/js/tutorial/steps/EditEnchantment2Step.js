import PolygonEnum from '../PolygonEnum';
import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class EditEnchantment2Step extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({
      prevStepId: 'EditEnchantment',
      nextStepId: 'TutorialFinish',
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

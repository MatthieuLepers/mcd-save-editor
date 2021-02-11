import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class TutorialFinishStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({ prevStepId: 'EditEnchantment2' });
  }
}

export default new TutorialFinishStep();

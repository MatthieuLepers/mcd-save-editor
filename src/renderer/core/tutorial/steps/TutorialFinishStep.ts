import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class TutorialFinishStep extends AbstractStep {
  constructor() {
    super({ prevStepId: 'EditEnchantment2' });
  }
}

export default new TutorialFinishStep();

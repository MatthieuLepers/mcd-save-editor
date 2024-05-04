import AbstractStep from '@renderer/core/tutorial/steps/AbstractStep';

class WelcomeStep extends AbstractStep {
  constructor() {
    super({ nextStepId: 'DragAndDrop' });
  }
}

export default new WelcomeStep();

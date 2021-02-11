import AbstractStep from './AbstractStep';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
class WelcomeStep extends AbstractStep {
  /**
   * @constructor
   */
  constructor() {
    super({ nextStepId: 'DragAndDrop' });
  }
}

export default new WelcomeStep();

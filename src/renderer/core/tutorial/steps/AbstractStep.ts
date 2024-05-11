import { tutorialStore } from '@renderer/core/tutorial/Store';
import StepList from '@renderer/core/tutorial/StepList';
import Objective, { type ObjectiveOptions } from '@renderer/core/tutorial/Objective';
import type { Polygon } from '@renderer/core/tutorial/PolygonEnum';

export interface StepOptions {
  nextStepId?: string;
  prevStepId?: string;
  objectiveList?: Record<string, Objective>;
}

export default class AbstractStep {
  public nextStepId: string | null = null;

  public prevStepId: string | null = null;

  public objectiveList: Record<string, Objective> = {};

  constructor(options?: StepOptions) {
    Object.assign(this, options ?? {});
  }

  get polygonList(): Array<Polygon> {
    if (this.hasObjectives()) {
      const [objective] = Object.values(this.objectiveList).filter((obj) => !obj.isFullfilled());
      return (objective ?? {}).polygonList ?? [];
    }
    return [];
  }

  get currentObjective(): Objective | {} {
    if (this.hasObjectives()) {
      const [objective] = Object.values(this.objectiveList).filter((obj) => !obj.isFullfilled());
      return (objective || {});
    }
    return {};
  }

  hasObjectives(): boolean {
    return !!Object.values(this.objectiveList).length;
  }

  addObjective(objectiveData: ObjectiveOptions) {
    this.objectiveList[objectiveData.name] = new Objective(objectiveData);
  }

  next() {
    if (this.nextStepId && this.isFinished()) {
      tutorialStore.state.currentStep = this.nextStepId;
      tutorialStore.state.stepData = StepList[this.nextStepId];
      tutorialStore.state.stepData.resetObjectives();
    }
  }

  prev() {
    if (this.prevStepId) {
      tutorialStore.state.currentStep = this.prevStepId;
      tutorialStore.state.stepData = StepList[this.prevStepId];
      tutorialStore.state.stepData.resetObjectives();
    }
  }

  isFinished(): boolean {
    return Object
      .values(this.objectiveList)
      .reduce((acc, objective) => acc && objective.isFullfilled(), true)
    ;
  }

  resetObjectives() {
    Object
      .values(this.objectiveList)
      .forEach((objective) => { objective.reset(); })
    ;
  }
}

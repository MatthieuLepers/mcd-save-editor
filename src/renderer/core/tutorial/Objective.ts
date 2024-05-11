import { tutorialStore } from '@renderer/core/tutorial/Store';
import type { Polygon } from '@renderer/core/tutorial/PolygonEnum';

export interface ObjectiveOptions {
  name: string;
  parent?: string;
  polygonList?: Array<Polygon>;
  fullfilled?: boolean;
  reasonId?: string;
  onFullfilled?: Function;
  onError?: Function;
}

export default class Objective {
  public name: string | null = null;

  public parent: string | null = null;

  public polygonList: Array<Polygon> = [];

  public fullfilled: boolean | null = null;

  public reasonId: string | null = null;

  public onFullfilled: Function | null = null;

  public onError: Function | null = null;

  constructor(options: ObjectiveOptions) {
    Object.assign(this, options ?? {});
  }

  setFullfilled(val: boolean, reasonId: string | null, force = false) {
    if (this.parent && !tutorialStore.state.stepData.objectiveList[this.parent].fullfilled) {
      return this;
    }
    if (!this.fullfilled || (this.fullfilled && this.reasonId !== null) || force) {
      this.fullfilled = val;
      this.reasonId = reasonId ?? null;
      if (this.isFullfilled() && typeof this.onFullfilled === 'function') {
        this.onFullfilled!();
      }
      if (!this.isFullfilled() && typeof this.onError === 'function') {
        this.onError!();
      }
    }
    return this;
  }

  getIcon(): string {
    if (this.fullfilled === null) {
      return 'neutral';
    }
    return this.fullfilled ? 'check' : 'close';
  }

  isFullfilled(): boolean {
    return !!this.fullfilled && !this.reasonId;
  }

  reset() {
    this.fullfilled = null;
    this.reasonId = null;
  }
}

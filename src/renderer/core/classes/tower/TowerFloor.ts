import { TowerFloorTypeEnum } from '@renderer/core/classes/enums/TowerFloorTypeEnum';
import TowerFloorChallenge from '@renderer/core/classes/tower/TowerFloorChallenge';

export interface ITowerFloorData {
  challenges?: Array<string>;
  rewards: Array<'any' | 'melee' | 'armor' | 'ranged' | 'artefact'>;
  tile: string;
  type: string;
}

export interface ITowerInnerInfoData {
  towerInfoBossesKilled: number;
  towerInfoCurrentFloor: number;
  towerInfoFloors: Array<{
    towerFloorType: 'Empty' | 'Combat' | 'Merchant' | 'Boss';
  }>;
}

export default class TowerFloor {
  public challenges: Array<TowerFloorChallenge>;

  constructor(
    public data: ITowerFloorData,
    public index: number,
    public infos: any,
  ) {
    this.challenges = (this.data.challenges ?? []).map((challengeData) => new TowerFloorChallenge(challengeData));
  }

  get type(): string {
    return this.infos.towerFloorType;
  }

  get challenge(): TowerFloorChallenge | null {
    return this.challenges[0] ?? null;
  }

  isEmpty(): boolean {
    return this.infos.towerFloorType === TowerFloorTypeEnum.EMPTY;
  }

  isCombat(): boolean {
    return this.infos.towerFloorType === TowerFloorTypeEnum.COMBAT;
  }

  isMerchant(): boolean {
    return this.infos.towerFloorType === TowerFloorTypeEnum.MERCHANT;
  }

  isBoss(): boolean {
    return this.infos.towerFloorType === TowerFloorTypeEnum.BOSS;
  }
}

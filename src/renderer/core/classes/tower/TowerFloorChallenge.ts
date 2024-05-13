const LEVEL_REGEX = /^twr_([a-z]+)(?:_(floor_[0-9]+))?(?:_(arena))?(?:_(scattered|compact))?_(easy|medium|hard)(?:_mix)?$/;

export interface ITowerFloorChallengeConfig {
  level?: string;
  difficulty?: string;
  boss?: string;
  variant?: string;
  arena?: boolean;
  modifier?: string;
}

export default class TowerFloorChallenge {
  constructor(public data: string) {
  }

  get level(): string | null {
    return this.configuration.level ?? null;
  }

  get difficulty(): string | null {
    return this.configuration.difficulty ?? null;
  }

  get boss(): string | null {
    return this.configuration.boss ?? null;
  }

  get configuration(): ITowerFloorChallengeConfig {
    if (this.data.startsWith('tower_base_challenge')) {
      return {
        level: 'base',
        difficulty: this.data.replace('tower_base_challenge_', ''),
      };
    }
    if (this.data.startsWith('tower_boss')) {
      return { boss: this.data.replace('tower_boss_', '') };
    }
    if (this.data.startsWith('twr_')) {
      const [, level, floorVariant, arena, modifier, difficulty] = this.data.match(LEVEL_REGEX)!;
      const conf: ITowerFloorChallengeConfig = { level, difficulty };
      if (floorVariant) conf.variant = floorVariant;
      if (arena) conf.arena = true;
      if (modifier) conf.modifier = modifier;
      return conf;
    }
    return {};
  }
}

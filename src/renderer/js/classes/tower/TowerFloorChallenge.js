const LEVEL_REGEX = /^twr_([a-z]+)(?:_(floor_[0-9]+))?(?:_(arena))?(?:_(scattered|compact))?_(easy|medium|hard)$/;

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class TowerFloorChallenge {
  /**
   * @constructor
   * @param {String} data
   */
  constructor(data) {
    this.$data = data;
  }

  /**
   * @return {String}
   */
  get level() {
    return this.configuration.level;
  }

  /**
   * @return {String}
   */
  get difficulty() {
    return this.configuration.difficulty || null;
  }

  /**
   * @return {String}
   */
  get boss() {
    return this.configuration.boss || null;
  }

  /**
   * @return {Object}
   */
  get configuration() {
    if (this.$data.startsWith('tower_base_challenge')) {
      return {
        level: 'base',
        difficulty: this.$data.replace('tower_base_challenge_', ''),
      };
    }
    if (this.$data.startsWith('tower_boss')) {
      return { boss: this.$data.replace('tower_boss_', '') };
    }
    if (this.$data.startsWith('twr_')) {
      const [, level, floorVariant, arena, modifier, difficulty] = this.$data.match(LEVEL_REGEX);
      const conf = { level };
      if (floorVariant) conf.variant = floorVariant;
      if (arena) conf.arena = true;
      if (modifier) conf.modifier = modifier;
      conf.difficulty = difficulty;
      return conf;
    }
    return {};
  }
}

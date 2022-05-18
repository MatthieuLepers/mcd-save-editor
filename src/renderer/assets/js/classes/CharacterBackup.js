import { ipcRenderer } from 'electron';
import DateUtils from '../utils/DateUtils';
import i18n from '../../../plugins/i18n';

/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default class CharacterBackup {
  /**
   * @constructor
   * @param {Object} data
   */
  constructor(data) {
    this.$data = {
      filePath: null,
      profilId: null,
      characterId: null,
    };

    Object.assign(this.$data, data);
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (val) => { this.$data[key] = val; },
      });
    });
  }

  /**
   * @return {Date}
   */
  get createdAt() {
    const regex = new RegExp(`^${this.characterId}-([0-9]{4})-([0-9]{2})-([0-9]{2})-([0-9]{2})h([0-9]{2})\\.json\\.bak$`);
    return new Date(this.filePath.replace(regex, '$1-$2-$3 $4:$5'));
  }

  /**
   * @return {String}
   */
  get formatedDate() {
    return DateUtils.format(this.createdAt, i18n.t('MCD.CharacterCorruptionDetection.dateFormat'));
  }

  /**
   * @return {Promise<Boolean>}
   */
  restore() {
    return ipcRenderer.invoke('restore-backup', this.profilId, this.characterId, this.filePath);
  }
}

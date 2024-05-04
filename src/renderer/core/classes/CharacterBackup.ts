import i18n from '@renderer/plugins/i18n';
import DateUtils from '@renderer/core/DateUtils';

export interface ICharacterBackup {
  filePath: string | null;
  profilId: string | null;
  characterId: string | null;
}

export default class CharacterBackup {
  declare filePath: string;

  declare profilId: string;

  declare characterId: string;

  public data: ICharacterBackup = {
    filePath: null,
    profilId: null,
    characterId: null,
  };

  constructor(data: ICharacterBackup) {
    this.data = data;

    Object.assign(this.data, data);
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.data[key],
        set: (val) => { this.data[key] = val; },
      });
    });
  }

  get createdAt(): Date {
    const regex = new RegExp(`^${this.characterId}-([0-9]{4})-([0-9]{2})-([0-9]{2})-([0-9]{2})h([0-9]{2})\\.json\\.bak$`);
    return new Date(this.filePath.replace(regex, '$1-$2-$3 $4:$5'));
  }

  get formatedDate(): string {
    return DateUtils.format(this.createdAt, i18n.global.t('MCD.CharacterCorruptionDetection.dateFormat'));
  }

  async restore(): Promise<boolean> {
    return api.invoke('restoreBackup', this.profilId, this.characterId, this.filePath);
  }
}

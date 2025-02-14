import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IRemoteSetting, ISetting } from '@renderer/core/entities/setting/i';
import { api } from '@renderer/core/api';

export default class Setting extends AbstractEntity<ISetting> {
  declare key: string;

  declare value: string;

  getBoolean(): boolean {
    return this.value === 'true';
  }

  setBoolean(value: boolean) {
    this.value = value.toString();
  }

  static async findAll(): Promise<Record<string, Setting>> {
    const settings = await api.Setting.findAll();
    return settings.reduce((acc: Record<string, Setting>, val: IRemoteSetting) => ({
      ...acc,
      [val.dataValues.key]: new Setting(val.dataValues),
    }), {});
  }

  async save(): Promise<Setting> {
    const { key, value } = this.data;
    await api.Setting.updateOrCreate(JSON.stringify({ key, value }));
    return this;
  }
}

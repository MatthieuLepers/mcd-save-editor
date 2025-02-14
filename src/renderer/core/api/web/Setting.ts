import type { IRemoteSetting, ISetting } from '@renderer/core/entities/setting/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/Storage';

export async function findAll(): Promise<Array<IRemoteSetting>> {
  const storage = getLocalStorage();
  return Object.entries(storage.settings).map(([key, value]) => ({
    dataValues: { key, value },
  }));
}

export async function updateOrCreate(body: string): Promise<IRemoteSetting> {
  const storage = getLocalStorage();
  const values: ISetting = JSON.parse(body);
  storage.settings[values.key] = values.value;
  setLocalStorage(storage);
  return {
    dataValues: values,
  };
}

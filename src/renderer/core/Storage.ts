import type { IGameItem } from '@renderer/core/entities/item/i';
import demo from '../public/json/demo.json';
import { name } from '../../../package.json';

interface ICharacter {
  currency: Array<{
    count: number;
    type: string;
  }>;
  items: Array<IGameItem>;
  name: string;
  playerId: string;
  skin: string;
  storageChestItems: Array<IGameItem>;
  xp: number;
}

interface IStorage {
  settings: Record<string, string>;
  character: ICharacter;
  file: string;
}

const DEFAULT_STORAGE: IStorage = {
  settings: {},
  character: demo,
  file: 'demo.json',
};

export function getLocalStorage(): IStorage {
  try {
    return JSON.parse(localStorage.getItem(name) ?? JSON.stringify(DEFAULT_STORAGE));
  } catch {
    return DEFAULT_STORAGE;
  }
}

export function setLocalStorage(storage: IStorage) {
  localStorage.setItem(name, JSON.stringify(storage));
}

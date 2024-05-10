import Currencies, { ICurrency } from '@renderer/core/classes/Currencies';
import Inventory from '@renderer/core/classes/Inventory';
import StorageChest from '@renderer/core/classes/StorageChest';
import CharacterBackup from '@renderer/core/classes/CharacterBackup';
import type { IItem } from '@renderer/core/classes/Item';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import EncryptionService from '@renderer/core/services/EncryptionService';
import CharacterUtils from '@renderer/core/utils/CharacterUtils';
import ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';

export interface ICharacter {
  currency: Array<ICurrency>;
  items: Array<IItem>;
  name: string;
  playerId: string;
  storageChestItems: Array<IItem>;
  xp: number;
}

export default class Character {
  public corrupted: Array<ValidationErrorReport> = [];

  public currencies: Currencies;

  public inventory: Inventory;

  public storageChest: StorageChest;

  /**
   * @constructor
   * @param {Object} data
   * @param {String} filePath
   */
  constructor(
    public data: ICharacter,
    public filePath: string,
  ) {
    this.corrupted = CharacterUtils.getDataCorrupted(this.data);
    this.currencies = new Currencies(this.data.currency);
    this.inventory = new Inventory(this.corrupted.length ? [] : this.data.items);
    this.storageChest = new StorageChest(this.corrupted.length ? [] : this.data.storageChestItems);
  }

  get id(): string {
    return this.filePath.replace('.dat', '').split('/').pop()!;
  }

  get profilId(): string {
    return this.filePath.replace('.dat', '').split('/').shift()!;
  }

  get uuid(): string {
    return this.data.playerId.replace(/-/, '');
  }

  get level(): number {
    return CharacterUtils.xp2Level(this.data.xp);
  }

  set level(level: number) {
    this.data.xp = CharacterUtils.level2Xp(level);
  }

  get enchantmentPointsInvested(): number {
    return [...this.inventory.items, ...this.storageChest.items]
      .reduce((acc, item) => acc + item.enchantmentPointsInvested, 0)
    ;
  }

  get enchantmentPoints(): number {
    return this.level - this.enchantmentPointsInvested - 1;
  }

  async save(): Promise<boolean> {
    return EncryptionService.encrypt(JSON.stringify(this.data, null, 2), this.filePath);
  }

  async reload() {
    this.data = await EncryptionService.decrypt(this.filePath, true);
    this.corrupted = CharacterUtils.getDataCorrupted(this.data);
    this.currencies = new Currencies(this.data.currency);
    this.inventory = new Inventory(this.corrupted.length ? [] : this.data.items);
    this.storageChest = new StorageChest(this.corrupted.length ? [] : this.data.storageChestItems);
    globalStore.setters.setCharacter(this);
  }

  softReload() {
    this.corrupted = CharacterUtils.getDataCorrupted(this.data);
    this.currencies = new Currencies(this.data.currency);
    this.inventory = new Inventory(this.corrupted.length ? [] : this.data.items);
    this.storageChest = new StorageChest(this.corrupted.length ? [] : this.data.storageChestItems);
    globalStore.setters.setCharacter(this);
  }

  static async loadFromFile(filePath: string, force = false): Promise<Character> {
    const data = await EncryptionService.decrypt(filePath, force);
    return new Character(data, filePath);
  }

  getAvailableBackup(): Array<CharacterBackup> {
    return api
      .sendSync('fetchCharacterBackups', this.filePath)
      .map((filePath: string) => new CharacterBackup({ filePath, profilId: this.profilId, characterId: this.id }))
      .sort((a: CharacterBackup, b: CharacterBackup) => b.createdAt.getTime() - a.createdAt.getTime())
    ;
  }
}

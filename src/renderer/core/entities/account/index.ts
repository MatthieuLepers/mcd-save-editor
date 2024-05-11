import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { settingsStore } from '@renderer/core/entities/setting/store';
import type { IAccount, IRemoteAccount } from '@renderer/core/entities/account/i';

export default class Account extends AbstractEntity<IAccount> {
  declare readonly id: number;

  declare name: string;

  declare username: string;

  declare email: string;

  declare domain: string;

  declare hidden: boolean;

  declare favicon: string;

  declare readonly createAt: Date;

  declare readonly updatedAt: Date;

  constructor(data: IAccount) {
    super(data, ['password']);
  }

  get password(): string {
    const { cipherKey, cipherIv } = settingsStore.state.settings;
    return api.CipherUtils.decipher({
      key: cipherKey.value,
      iv: cipherIv.value,
    }, this.data.password);
  }

  set password(password: string) {
    const { cipherKey, cipherIv } = settingsStore.state.settings;
    this.data.password = api.CipherUtils.cipher({
      key: cipherKey.value,
      iv: cipherIv.value,
    }, password);
  }

  get realDomain(): string {
    return this.domain.replace(/^(?:https?:\/\/)?(?:w{3}\.)?([^/]+)\/?.*$/, '$1');
  }

  isPasswordDuplicated(accountList: Array<Account>): boolean {
    return accountList.filter((account) => account.id !== this.id && account.password === this.password).length > 0;
  }

  async save(): Promise<Account> {
    const { name, username, email, password, domain, hidden } = this.data;
    if (this.id) {
      await api.Account.update(this.id, JSON.stringify({ name, username, email, password, domain, hidden }));
      return this;
    }
    return Account.create({ name, username, email, password, domain, hidden });
  }

  async destroy(): Promise<boolean> {
    if (!this.id) {
      throw new Error('Cannot destroy unexisting account');
    }
    return api.Account.destroy(this.id);
  }

  static async findById(id: number): Promise<Account | null> {
    const account = await api.Account.findById(id);
    return account
      ? new Account(account.dataValues)
      : null
    ;
  }

  static async findAll(): Promise<Array<Account>> {
    const accounts = await api.Account.findAll();
    return accounts.map((account: IRemoteAccount) => new Account(account.dataValues));
  }

  static async create(values: Partial<IAccount>): Promise<Account> {
    const account: IRemoteAccount = await api.Account.create(values);
    return new Account(account.dataValues);
  }
}

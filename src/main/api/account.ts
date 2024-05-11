import { ipcRenderer } from 'electron';
import { Identifier } from 'sequelize';

import { Account } from '@/main/database/models';
import type { IAccount } from '@renderer/core/entities/account/i';

export async function findById(id: Identifier): Promise<Account | null> {
  return Account.findByPk(id, {
    include: [
      { model: Account },
    ],
  });
}

export async function findAll(): Promise<Array<Account>> {
  return Account.findAll({
    include: [
      { model: Account },
    ],
  });
}

export async function create(values: Partial<IAccount>): Promise<Account> {
  const favicon = await ipcRenderer.invoke('getFavicon', values.domain);
  const obj = await Account.create({ ...values, favicon });
  return obj;
}

export async function update(identifier: Identifier, body: string): Promise<Account | null> {
  const obj = await Account.findByPk(identifier);
  if (obj) {
    const values: Partial<IAccount> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}

export async function destroy(identifier: Identifier): Promise<boolean> {
  const obj = await Account.findByPk(identifier);
  return obj
    ? obj.destroy().then(() => true).catch(() => false)
    : false
  ;
}

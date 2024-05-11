export interface IAccount {
  readonly id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  domain: string;
  hidden: boolean;
  favicon: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
}

export interface IRemoteAccount {
  dataValues: IAccount;
}

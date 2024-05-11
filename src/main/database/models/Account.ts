import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  modelName: 'accounts',
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare domain: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare hidden: boolean;

  @Default(null)
  @Column(DataType.TEXT)
  declare favicon: string;
}

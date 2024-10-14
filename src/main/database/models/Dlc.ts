import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  modelName: 'dlcs',
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Dlc extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare releasedAt: Date;
}

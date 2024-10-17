import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  modelName: 'events',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Event extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare startedAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare endedAt: Date;
}

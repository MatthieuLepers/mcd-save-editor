import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { AncientMob } from '@/main/database/models';

@Table({
  modelName: 'ancientMobI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class AncientMobI18n extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => AncientMob)
  @Column(DataType.STRING)
  declare ancientMobId: string;

  @BelongsTo(() => AncientMob)
  declare ancientMob: AncientMob;
}

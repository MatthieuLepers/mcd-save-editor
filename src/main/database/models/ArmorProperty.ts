import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Dlc, ArmorPropertyI18n } from '@/main/database/models';

@Table({
  modelName: 'armorProperties',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArmorProperty extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => Dlc)
  @AllowNull(true)
  @Column(DataType.STRING)
  declare dlcId: string;

  @HasMany(() => ArmorPropertyI18n)
  declare i18n: Array<ArmorPropertyI18n>;
}

import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  HasMany,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Dlc, EnchantI18n } from '@/main/database/models';

@Table({
  modelName: 'enchants',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Enchant extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => Dlc)
  @AllowNull(true)
  @Column(DataType.STRING)
  declare dlcId: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare type: Array<'Armor' | 'Melee' | 'Ranged'>;

  @Default('Common')
  @Column(DataType.STRING)
  declare tier: 'Common' | 'Powerful';

  @HasMany(() => EnchantI18n)
  declare i18n: Array<EnchantI18n>;
}

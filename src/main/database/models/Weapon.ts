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
import { Dlc, WeaponI18n } from '@/main/database/models';

@Table({
  modelName: 'weapons',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Weapon extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => Dlc)
  @AllowNull(true)
  @Column(DataType.STRING)
  declare dlcId: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  declare events: Array<string>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: 'Melee' | 'Ranged';

  @AllowNull(false)
  @Column(DataType.JSON)
  declare rarity: Array<'Common' | 'Rare' | 'Unique'>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare stats: Record<string, number>;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare soulgathering: boolean;

  @Default([])
  @Column(DataType.JSON)
  declare activeEnchants: Array<string>;

  @HasMany(() => WeaponI18n)
  declare i18n: Array<WeaponI18n>;
}

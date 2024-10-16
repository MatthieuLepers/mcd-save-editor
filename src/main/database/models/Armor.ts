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
import { Dlc, ArmorI18n } from '@/main/database/models';

@Table({
  modelName: 'armors',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Armor extends Model {
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

  @Default('Armor')
  @Column(DataType.STRING)
  declare type: 'Armor';

  @AllowNull(false)
  @Column(DataType.JSON)
  declare rarity: Array<'Common' | 'Rare' | 'Unique'>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare soulgathering: boolean;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare armorproperties: Array<string>;

  @HasMany(() => ArmorI18n)
  declare i18n: Array<ArmorI18n>;
}

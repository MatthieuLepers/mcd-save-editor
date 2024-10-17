import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import { AncientMobI18n } from '@/main/database/models';

@Table({
  modelName: 'ancientMobs',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class AncientMob extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare neededRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare rewards: Array<string>;

  @HasMany(() => AncientMobI18n)
  declare i18n: Array<AncientMobI18n>;
}

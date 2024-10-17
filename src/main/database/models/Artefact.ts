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
import { Dlc, ArtefactI18n } from '@/main/database/models';

@Table({
  modelName: 'artefacts',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Artefact extends Model {
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

  @Default('Artefact')
  @Column(DataType.STRING)
  declare type: 'Artefact';

  @AllowNull(false)
  @Column(DataType.JSON)
  declare rarity: Array<'Common' | 'Rare' | 'Unique'>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare ancientHuntRunes: Array<'a' | 'c' | 'i' | 'o' | 'p' | 'r' | 's' | 't' | 'u'>;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare soulgathering: boolean;

  @HasMany(() => ArtefactI18n)
  declare i18n: Array<ArtefactI18n>;
}

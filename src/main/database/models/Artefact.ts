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
import { Dlc, Event, ArtefactI18n } from '@/main/database/models';

@Table({
  modelName: 'artefacts',
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

  @ForeignKey(() => Event)
  @AllowNull(true)
  @Column(DataType.STRING)
  declare eventId: string;

  @Default('Artefact')
  @Column(DataType.STRING)
  declare type: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare rarity: Array<string>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare ancientHuntRunes: Array<string>;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare soulgathering: boolean;

  @HasMany(() => ArtefactI18n)
  declare i18n: Array<ArtefactI18n>;
}

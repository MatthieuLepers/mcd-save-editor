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
import { Artefact } from '@/main/database/models';

@Table({
  modelName: 'artefactI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArtefactI18n extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Artefact)
  @Column(DataType.STRING)
  declare artefactId: string;

  @BelongsTo(() => Artefact)
  declare artefact: Artefact;
}

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
import { Armor } from '@/main/database/models';

@Table({
  modelName: 'armorI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArmorI18n extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Armor)
  @Column(DataType.STRING)
  declare armorId: string;

  @BelongsTo(() => Armor)
  declare armor: Armor;
}

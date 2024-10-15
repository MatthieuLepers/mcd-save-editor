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
import { ArmorProperty } from '@/main/database/models';

@Table({
  modelName: 'armorPropertyI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArmorPropertyI18n extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => ArmorProperty)
  @Column(DataType.STRING)
  declare armorPropertyId: string;

  @BelongsTo(() => ArmorProperty)
  declare armorProperty: ArmorProperty;
}

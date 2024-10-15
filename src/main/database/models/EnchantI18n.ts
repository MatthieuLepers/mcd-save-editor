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
import { Enchant } from '@/main/database/models';

@Table({
  modelName: 'enchantI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class EnchantI18n extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.TEXT)
  declare desc: string;

  @Column(DataType.JSON)
  declare level: [string, string, string];

  @ForeignKey(() => Enchant)
  @Column(DataType.STRING)
  declare enchantId: string;

  @BelongsTo(() => Enchant)
  declare enchant: Enchant;
}

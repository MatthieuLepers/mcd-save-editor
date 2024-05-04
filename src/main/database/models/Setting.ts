import crypto from 'crypto';
import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import WinstonInstance from '@/main/utils/WinstonInstance';
import { serial } from '@/main/utils/PromiseUtils';

@Table({
  modelName: 'settings',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['key'],
    },
  ],
})
export class Setting extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare key: string;

  @Column(DataType.TEXT)
  declare value: string;

  static async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    const setting = await Setting.findByPk(key);
    return setting?.value
      ? JSON.parse(setting.value) as T
      : defaultValue || null
    ;
  }

  static async set<T>(key: string, value: T): Promise<void> {
    await Setting.create({ key, value: JSON.stringify(value) });
  }

  static async createDefault(): Promise<void> {
    const DEFAULT_SETTINGS = {
      firstStart: true,
      locale: 'en-EN',
      cipherKey: crypto.randomBytes(16).toString('hex'),
      cipherIv: crypto.randomBytes(8).toString('hex'),
    };

    try {
      await serial(Object.entries(DEFAULT_SETTINGS).map(([key, value]) => async () => {
        const [setting] = await Setting.findOrCreate({
          where: { key },
          defaults: { key, value },
        });
        return setting;
      }));
    } catch (e) {
      WinstonInstance.error((e as Error).toString());
    }
  }
}

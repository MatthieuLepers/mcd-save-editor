import WinstonInstance from '@/main/utils/WinstonInstance';
import { DATABASE_FILE } from '@/main/utils/Constants';

export default {
  dialect: 'sqlite',
  storage: DATABASE_FILE,
  logging: (msg: string) => WinstonInstance.info(msg),
  pool: {
    max: 20,
    min: 2,
    acquire: 20000,
    idle: 5000,
  },
  retry: {
    max: 10,
  },
};

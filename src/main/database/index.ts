import { Sequelize } from 'sequelize-typescript';

import config from '@/main/database/config';
import * as models from '@/main/database/models';

const sequelize = new Sequelize({
  ...config,
  models: Object.values(models),
  dialect: 'sqlite',
});

export { sequelize };

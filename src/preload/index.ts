import { contextBridge } from 'electron';

import { sequelize } from '@/main/database';
import { Setting } from '@/main/database/models';
import { populate } from '@/main/database/populate';
import api from '@/main/api';

contextBridge.exposeInMainWorld('api', api);

sequelize.sync()
  .then(async () => {
    const settingFirstStart = await Setting.get<boolean>('firstStart');
    if (settingFirstStart) {
      await populate();
      await Setting.set<boolean>('firstStart', false);
    }
    api.sendSync('databaseReady');
  })
  .catch(console.log)
;

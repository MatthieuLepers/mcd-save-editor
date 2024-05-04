import fs from 'fs';

import { IpcOn } from '@/main/decorators';
import { SAVE_PATH } from '@/main/utils/Constants';

class CharacterModule {
  @IpcOn
  static fetchCharacterBackups(filePath: string): Array<string> {
    const backupFolder = `${SAVE_PATH}/${filePath.replace('.dat', '')}`;
    const characterId = backupFolder.split('/').pop();
    if (fs.existsSync(backupFolder)) {
      return fs
        .readdirSync(backupFolder)
        .filter((file) => new RegExp(`^${characterId}-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}h[0-9]{2}\\.json\\.bak$`).test(file))
      ;
    }
    return [];
  }
}

export default () => CharacterModule;

import { ICharacter } from '@renderer/core/classes/Character';
import { api } from '@renderer/core/api';

export default class EncryptionService {
  static async encrypt(data: string, file: string, overwrite = true): Promise<boolean> {
    return api.invoke('encryptFile', data, file, overwrite);
  }

  static decrypt(file: string, force = false): Promise<ICharacter> {
    return api.invoke('decryptFile', file, force);
  }
}

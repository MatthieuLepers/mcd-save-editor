import type { IRemoteDlc } from '@renderer/core/entities/dlc/i';
import DlcData from '@/main/public/Dlcs.json';

export async function findAll(): Promise<Array<IRemoteDlc>> {
  return DlcData.map((dlc) => ({
    dataValues: {
      ...dlc,
      releasedAt: new Date(dlc.releasedAt),
    },
  }));
}

import type { IRemoteAncientMob } from '@renderer/core/entities/ancientMob/i';
import AncientMobData from '@/main/public/AncientMobs.json';

export async function findAll(): Promise<Array<IRemoteAncientMob>> {
  return AncientMobData.map((ancientMob) => ({
    dataValues: {
      ...ancientMob,
      i18n: ancientMob.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

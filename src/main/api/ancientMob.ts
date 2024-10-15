import { AncientMob, AncientMobI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<AncientMob>> {
  return AncientMob.findAll({
    include: [
      { model: AncientMobI18n },
    ],
  });
}

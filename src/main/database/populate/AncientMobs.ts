import { AncientMobI18n, AncientMob } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONAncientMobs from '@/main/public/AncientMobs.json';

export const populate = async () => {
  await serial(JSONAncientMobs
    .map((data) => () => AncientMob.create(data, {
      include: [AncientMobI18n],
    }).catch(console.log)))
  ;
};

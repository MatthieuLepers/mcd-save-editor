import { ArmorI18n, Armor } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONArmors from '@/main/public/Armors.json';

export const populate = async () => {
  await serial(JSONArmors
    .map((data) => () => Armor.create(data, {
      include: [ArmorI18n],
    }).catch(console.log)))
  ;
};

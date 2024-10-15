import { ArmorI18n, Armor } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONArmorProperties from '@/main/public/ArmorProperties.json';

export const populate = async () => {
  await serial(JSONArmorProperties
    .map((data) => () => Armor.create({ ...data }, {
      include: [ArmorI18n],
    }).catch(console.log)))
  ;
};

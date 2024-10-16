import { ArmorPropertyI18n, ArmorProperty } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONArmorProperties from '@/main/public/ArmorProperties.json';

export const populate = async () => {
  await serial(JSONArmorProperties
    .map((data) => () => ArmorProperty.create(data, {
      include: [ArmorPropertyI18n],
    }).catch(console.log)))
  ;
};

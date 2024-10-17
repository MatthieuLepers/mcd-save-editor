import { EnchantI18n, Enchant } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONEnchants from '@/main/public/Enchants.json';

export const populate = async () => {
  await serial(JSONEnchants
    .map((data) => () => Enchant.create(data, {
      include: [EnchantI18n],
    }).catch(console.log)))
  ;
};

import { WeaponI18n, Weapon } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONWeapons from '@/main/public/Weapons.json';

export const populate = async () => {
  await serial(JSONWeapons
    .map((data) => () => Weapon.create(data, {
      include: [WeaponI18n],
    }).catch(console.log)))
  ;
};

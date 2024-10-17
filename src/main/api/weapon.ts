import { Weapon, WeaponI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<Weapon>> {
  return Weapon.findAll({
    include: [
      { model: WeaponI18n },
    ],
  });
}

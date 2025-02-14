import type { IRemoteWeapon } from '@renderer/core/entities/weapon/i';
import WeaponData from '@/main/public/Weapons.json';

export async function findAll(): Promise<Array<IRemoteWeapon>> {
  // @ts-ignore
  return WeaponData.map((weapon) => ({
    dataValues: {
      ...weapon,
      i18n: weapon.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

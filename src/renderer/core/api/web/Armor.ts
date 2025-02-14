import type { IRemoteArmor } from '@renderer/core/entities/armor/i';
import ArmorData from '@/main/public/Armors.json';

export async function findAll(): Promise<Array<IRemoteArmor>> {
  // @ts-ignore
  return ArmorData.map((armor) => ({
    dataValues: {
      ...armor,
      i18n: armor.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

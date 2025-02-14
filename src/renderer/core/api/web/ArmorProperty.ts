import type { IRemoteArmorProperty } from '@renderer/core/entities/armorProperty/i';
import ArmorPropertyData from '@/main/public/ArmorProperties.json';

export async function findAll(): Promise<Array<IRemoteArmorProperty>> {
  return ArmorPropertyData.map((armorProperty) => ({
    dataValues: {
      ...armorProperty,
      i18n: armorProperty.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

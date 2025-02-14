import type { IRemoteEnchant } from '@renderer/core/entities/enchant/i';
import EnchantData from '@/main/public/Enchants.json';

export async function findAll(): Promise<Array<IRemoteEnchant>> {
  // @ts-ignore
  return EnchantData.map((enchant) => ({
    dataValues: {
      ...enchant,
      i18n: enchant.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

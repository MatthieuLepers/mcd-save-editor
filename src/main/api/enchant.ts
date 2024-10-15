import { Enchant, EnchantI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<Enchant>> {
  return Enchant.findAll({
    include: [
      { model: EnchantI18n },
    ],
  });
}

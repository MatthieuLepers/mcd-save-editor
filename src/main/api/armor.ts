import { Armor, ArmorI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<Armor>> {
  return Armor.findAll({
    include: [
      { model: ArmorI18n },
    ],
  });
}

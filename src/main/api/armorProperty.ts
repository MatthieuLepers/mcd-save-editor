import { ArmorProperty, ArmorPropertyI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<ArmorProperty>> {
  return ArmorProperty.findAll({
    include: [
      { model: ArmorPropertyI18n },
    ],
  });
}

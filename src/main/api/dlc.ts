import { Dlc } from '@/main/database/models';

export async function findAll(): Promise<Array<Dlc>> {
  return Dlc.findAll();
}

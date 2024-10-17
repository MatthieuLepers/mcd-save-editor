import { Dlc } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONDlcs from '@/main/public/Dlcs.json';

export const populate = async () => {
  await serial(JSONDlcs
    .map((data) => () => Dlc.create(data).catch(console.log)))
  ;
};

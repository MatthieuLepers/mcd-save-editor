import { Event } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONEvents from '@/main/public/Events.json';

export const populate = async () => {
  await serial(JSONEvents
    .map((data) => () => Event.create(data).catch(console.log)))
  ;
};

import { Event } from '@/main/database/models';

export async function findAll(): Promise<Array<Event>> {
  return Event.findAll();
}

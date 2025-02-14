import type { IRemoteEvent } from '@renderer/core/entities/event/i';
import EventData from '@/main/public/Events.json';

export async function findAll(): Promise<Array<IRemoteEvent>> {
  return EventData.map((event) => ({
    dataValues: {
      ...event,
      startedAt: new Date(event.startedAt),
      endedAt: new Date(event.endedAt),
    },
  }));
}

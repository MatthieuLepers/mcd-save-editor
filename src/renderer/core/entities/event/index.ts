import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import type { IEvent } from '@renderer/core/entities/event/i';

export default class Event extends AbstractEntity<IEvent> {
  declare id: string;

  declare startedAt: Date;

  declare endedAt: Date;

  constructor(data: IEvent) {
    super(data, []);
  }
}

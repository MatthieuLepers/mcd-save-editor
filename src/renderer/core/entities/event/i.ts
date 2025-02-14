export interface IEvent {
  id: string;
  startedAt: Date;
  endedAt: Date;
}

export interface IRemoteEvent {
  dataValues: IEvent;
}

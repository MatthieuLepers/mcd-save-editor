export interface IDlc {
  id: string;
  releasedAt: Date;
}

export interface IRemoteDlc {
  dataValues: IDlc;
}

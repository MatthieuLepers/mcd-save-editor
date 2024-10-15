import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import type { IDlc } from '@renderer/core/entities/dlc/i';

export default class Dlc extends AbstractEntity<IDlc> {
  declare id: string;

  declare releasedAt: Date;

  constructor(data: IDlc) {
    super(data, []);
  }
}

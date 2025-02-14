import type { IRemoteArtefact } from '@renderer/core/entities/artefact/i';
import ArtefactData from '@/main/public/Artefacts.json';

export async function findAll(): Promise<Array<IRemoteArtefact>> {
  // @ts-ignore
  return ArtefactData.map((artefact) => ({
    dataValues: {
      ...artefact,
      i18n: artefact.i18n.map((dataValues) => ({ dataValues })),
    },
  }));
}

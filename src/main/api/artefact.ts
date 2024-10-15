import { Artefact, ArtefactI18n } from '@/main/database/models';

export async function findAll(): Promise<Array<Artefact>> {
  return Artefact.findAll({
    include: [
      { model: ArtefactI18n },
    ],
  });
}

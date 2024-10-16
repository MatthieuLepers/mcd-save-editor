import { ArtefactI18n, Artefact } from '@/main/database/models';
import { serial } from '@/main/utils/PromiseUtils';
import JSONArtefacts from '@/main/public/Artefacts.json';

export const populate = async () => {
  await serial(JSONArtefacts
    .map((data) => () => Artefact.create(data, {
      include: [ArtefactI18n],
    }).catch(console.log)))
  ;
};

import Armors from './_Armors';
import Artefacts from './_Artefacts';
import MeleeWeapons from './_MeleeWeapons';
import RangedWeapons from './_RangedWeapons';

export default {
  Unknown: {
    disabled: true,
    name: 'Unknown',
    image: 'static/img/Items/Unknown.png',
    i18n: {
      'fr-FR': 'Inconnu',
      'en-EN': 'Unknown',
    },
  },
  ...Armors,
  ...Artefacts,
  ...MeleeWeapons,
  ...RangedWeapons,
};
